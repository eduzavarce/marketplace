const pool = await getPool();

const [users] = awaitpool.query(sql);

console.log("users", users);
