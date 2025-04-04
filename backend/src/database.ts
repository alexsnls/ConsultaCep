import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydatabase",
  password: "post1234",
  port: 5432,
});

export default pool;
