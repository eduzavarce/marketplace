const pool = await getPool();

const [products] = awaitpool.query(sql);

console.log("products", products);
