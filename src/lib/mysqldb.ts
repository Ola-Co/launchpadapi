// src/lib/mysqldb.ts
import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "your_mysql_user",
  password: "your_mysql_password",
  database: "your_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
