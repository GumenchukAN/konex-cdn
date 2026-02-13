import express from 'express';
import { pool } from './db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './middleware/auth.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET:', JWT_SECRET);


router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM admin WHERE name = $1',
      [name]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,      
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',         
      maxAge: 60 * 60 * 1000      
    });

    res.json({ message: 'Logged in successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token'); 
  res.json({ message: 'Logged out successfully' });
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ id: req.user.userId, name: req.user.name });
});

export {router as authRotes}