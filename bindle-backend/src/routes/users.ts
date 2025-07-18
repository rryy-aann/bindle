import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

// GET current user
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
      },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH update user
router.patch('/me', authenticate, async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        email: req.body.email,
        username: req.body.username,
        displayName: req.body.displayName,
        avatarUrl: req.body.avatarUrl, // ✅ added
      },
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// GET /api/users/become-seller
router.get('/become-seller', authenticate, async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: { isSeller: true },
    });

    res.status(200).json({
      message: 'You are now a seller.',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        isSeller: updatedUser.isSeller,
        username: updatedUser.username,
      },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update seller status.' });
  }
});

// PATCH /api/users/revoke-seller/:userId (admin-only)
router.patch('/revoke-seller/:userId', authenticate, async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ error: 'Admin privileges required.' });
    }

    const { userId } = req.params;

    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: { isSeller: false },
    });

    res.status(200).json({
      message: 'Seller status revoked.',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        isSeller: updatedUser.isSeller,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to revoke seller status.' });
  }
});

export default router;
