const getPool = require('../../infraestructure/database');

const findUserByEmail = async (email) => {
  const pool = await getPool();

  const sql = 'SELECT * FROM users WHERE email=?';

  const [users] = await pool.query(sql, email);

  console.log('users', users);
  return users;
};

module.exports = { findUserByEmail };
