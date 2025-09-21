// src/lib/mysqldb.ts
import mysql from "mysql2/promise";

// export const pool = mysql.createPool({
//   host: "localhost",
//   user: "your_mysql_user",
//   password: "your_mysql_password",
//   database: "your_database",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

import { createPool, Pool } from "mysql2/promise";
export const pool: Pool = createPool({
  // prefer to use .env for environment variables to hide passwords
  host: process.env.NEXT_PUBLIC_DB_HOST || "launchpad-db.dn.odinala.io",
  port: parseInt(process.env.NEXT_PUBLIC_DB_PORT || "8080"),
  user: process.env.NEXT_PUBLIC_DB_USER || "app",
  password: process.env.NEXT_PUBLIC_DB_PASSWORD || "",
  database: process.env.NEXT_PUBLIC_DB_DATABASE || "launchpad",
});
