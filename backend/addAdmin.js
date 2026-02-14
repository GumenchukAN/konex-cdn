import pkg from 'bcrypt';
import pkg2 from 'pg';
const { Client } = pkg2;
const { hash } = pkg;
import dotenv from 'dotenv';
dotenv.config();

import { pool } from './db.js';

await pool.connect();

const password1 = await hash('passwordFirst', 10);
const password2 = await hash('passwordSecond', 10);

await pool.query(
  "INSERT INTO admin (name, password, role) VALUES ($1, $2, 'admin'), ($3, $4, 'admin')",
  ['admin1', password1, 'admin2', password2]
);

await pool.end();
console.log('Адміни додані!');
