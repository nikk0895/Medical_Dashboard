import jwt from 'jsonwebtoken';
import { sql, poolConnect, pool } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET;

// --- SIGNUP ---
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    await poolConnect;

    // Check if email already exists
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');

    if (result.recordset.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Insert new user (plain text password)
    await pool.request()
      .input('firstName', sql.NVarChar, firstName)
      .input('lastName', sql.NVarChar, lastName)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, password)
      .query(`
        INSERT INTO Users (firstName, lastName, email, password)
        VALUES (@firstName, @lastName, @email, @password)
      `);

    return res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// --- LOGIN ---
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    await poolConnect;

    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT * FROM Users WHERE email = @email');

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.recordset[0];

    // Plain text password comparison
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};