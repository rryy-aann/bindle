import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// ---------------------
// REGISTER + AUTO-LOGIN
// ---------------------
router.post('/register', async (req, res) => {
  const { email, username, password, name, displayName } = req.body;

  if (!email || !password || !username || !name || !displayName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const existingUsername = await prisma.user.findUnique({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        displayName,
        password: hashedPassword,
        name
      }
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        displayName: newUser.displayName,
        isAdmin: newUser.isAdmin,
        isSeller: newUser.isSeller,
        level: newUser.level,
        xp: newUser.xp,
        coinBalance: newUser.coinBalance,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(201).json({ message: 'Registered and logged in' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err });
  }
});

// ---------------------
// LOGIN
// ---------------------
console.log('Login route is live');
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        level: user.level,
        xp: user.xp,
        coinBalance: user.coinBalance,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
});

// ---------------------
// LOGOUT
// ---------------------
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// ---------------------
// DELETE USER (AUTH REQUIRED)
// ---------------------
router.delete('/delete', authenticate, async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    await prisma.user.delete({
      where: { id: userId },
    });

    res.clearCookie('token');
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong during deletion' });
  }
});

export default router;
