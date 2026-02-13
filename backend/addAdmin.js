import pkg from 'bcrypt';
import pkg2 from 'pg';
const { Client } = pkg2;
const { hash } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

await client.connect();

const password1 = await hash('passwordFirst', 10);
const password2 = await hash('passwordSecond', 10);

await client.query(
  "INSERT INTO admin (name, password, role) VALUES ($1, $2, 'admin'), ($3, $4, 'admin')",
  ['admin1', password1, 'admin2', password2]
);

await client.end();
console.log('Адміни додані!');
