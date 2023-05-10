const getPool = require('../../infrastructure/database');

const findUserByEmail = async (email) => {
  const pool = await getPool();

  const sql = 'SELECT * FROM users WHERE email=?';

  const [users] = await pool.query(sql, email);

  return users[0];
};

const findUserByUsername = async (username) => {
  const pool = await getPool();

  const sql = 'SELECT * FROM users WHERE username=?';

  const [users] = await pool.query(sql, username);

  return users[0];
};

const findUserByActivationCode = async (code) => {
  const pool = await getPool();

  const sql = 'SELECT * FROM users WHERE verificationCode = ?';

  const [users] = await pool.query(sql, code);

  return users[0];
};

const createUser = async (username, email, passwordHash, verificationCode) => {
  const pool = await getPool();

  const sql = `INSERT INTO users(username, email, password, verificationCode) VALUES (?,?,?,?)`;

  const [response] = await pool.query(sql, [
    username,
    email,
    passwordHash,
    verificationCode,
  ]);

  return response.insertId;
};
const addUserVerificationDate = async (email) => {
  const pool = await getPool();
  const sql = `
        UPDATE users
        SET verifiedAt = now()
        WHERE email = ?
`;
  const [response] = await pool.query(sql, [email]);

  return response.insertId;
};

const findAllUsers = async () => {
  const pool = await getPool();
  const sql = 'SELECT id, name, email, verifiedAt, role FROM users';
  const [users] = await pool.query(sql);

  return users[0];
};

const updateUser = async (data) => {
  const { id, name, email, password } = data;
  const pool = await getPool();
  const sql = `
    UPDATE users
    SET name = ?, email = ?, password = ?
    WHERE id = ?
  `;
  await pool.query(sql, [name, email, password, id]);

  return true;
};

module.exports = {
  findUserByEmail,
  findUserByUsername,
  createUser,
  findUserByActivationCode,
  addUserVerificationDate,
  findAllUsers,
  updateUser,
};
