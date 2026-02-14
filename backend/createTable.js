import { pool } from "./db.js";

export async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE public.admin (
	    id int GENERATED ALWAYS AS IDENTITY NOT NULL,
	    name varchar NOT NULL,
	    password varchar NOT NULL,
	    role varchar NOT NULL
    );  
  `);
  } catch {
    console.log('Database table was not create');
  }
}