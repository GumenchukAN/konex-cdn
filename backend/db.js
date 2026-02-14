import pkg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const { Pool } = pkg;
import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-1' });

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('/certs/global-bundle.pem', 'utf-8')
  },
});
