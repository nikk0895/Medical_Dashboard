import express from 'express';
import cors from 'cors';

// New robust startup
async function loadEnv() {
	// Try to use dotenv if installed
	try {
		const dotenv = await import('dotenv');
		dotenv.config();
		console.log('Loaded environment using dotenv');
		return;
	} catch (err) {
		// fallthrough to manual .env parsing
	}

	// Fallback: try to read a local .env file and populate process.env
	try {
		const fs = await import('fs');
		const path = await import('path');
		const envPath = path.resolve(process.cwd(), '.env');
		const content = fs.readFileSync(envPath, 'utf8');
		for (const line of content.split(/\r?\n/)) {
			const m = line.match(/^\s*([^#][^=]*)=(.*)$/);
			if (!m) continue;
			let key = m[1].trim();
			let val = m[2].trim();
			if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
				val = val.slice(1, -1);
			}
			if (!process.env[key]) process.env[key] = val;
		}
		console.log('Loaded environment from .env file (manual)');
	} catch (err) {
		console.warn('dotenv not installed and .env not found — continuing with existing process.env');
	}
}

async function init() {
	await loadEnv();

	const PORT = process.env.PORT || 3000;
	const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:4200';

	const app = express();

	// Enable CORS
	app.use(cors({
		origin: FRONTEND_ORIGIN,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	}));

	app.use(express.json());

	// Try to import and initialize DB connection if available
	try {
		const dbMod = await import('./src/db.js');
		// If db exports a default function, call it. If it exports named connect, call that.
		if (dbMod && typeof dbMod.default === 'function') {
			await dbMod.default();
			console.log('Database connected (default export).');
		} else if (dbMod && typeof dbMod.connect === 'function') {
			await dbMod.connect();
			console.log('Database connected (connect export).');
		} else {
			console.log('Imported ./src/db.js but no connect function found — ensure it connects itself or export a connect function.');
		}
	} catch (err) {
		console.warn('Could not import or connect DB (./src/db.js):', err.message);
	}

	// Try to import auth routes; don't crash server if missing
	try {
		const authRoutesMod = await import('./src/routes/authRoutes.js');
		const authRoutes = authRoutesMod.default || authRoutesMod;
		app.use('/api/auth', authRoutes);
	} catch (err) {
		console.warn('Auth routes not loaded (./src/routes/authRoutes.js):', err.message);
	}

	// Default route
	app.get('/', (req, res) => res.send('Backend Server Running ✅'));

	// Start server
	app.listen(PORT, () => {
		console.log(`🚀 Server running on http://localhost:${PORT}`);
	});
}

init().catch(err => {
	console.error('Failed to start server:', err);
	process.exit(1);
});