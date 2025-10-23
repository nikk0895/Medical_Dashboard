const { sql, poolPromise } = require('../services/db');

async function getUserByEmail(email) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('email', sql.NVarChar, email)
    .query('SELECT * FROM dbo.Users WHERE email = @email');
  return result.recordset[0];
}

async function createUser(firstName, lastName, email, hashedPassword) {
  const pool = await poolPromise;
  await pool.request()
    .input('firstName', sql.NVarChar, firstName)
    .input('lastName', sql.NVarChar, lastName)
    .input('email', sql.NVarChar, email)
    .input('password', sql.NVarChar, hashedPassword)
    .query(`INSERT INTO dbo.Users (firstName, lastName, email, password)
            VALUES (@firstName, @lastName, @email, @password)`);
}

module.exports = { getUserByEmail, createUser };