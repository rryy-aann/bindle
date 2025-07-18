import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/me', authenticate, async (req, res) => {
  try {
    const userId = req.user!.id;

    const achievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: {
        achievement: true,
      },
    });

    const formatted = achievements.map((ua) => ({
      id: ua.achievement.id,
      title: ua.achievement.title,
      description: ua.achievement.description,
      icon: ua.achievement.icon,
      awardedAt: ua.awardedAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching achievements:', err);
    res.status(500).json({ message: 'Failed to load achievements' });
  }
});

export default router;
