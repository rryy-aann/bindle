import express from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/listings - Create a new book listing (Seller-only)
router.post('/', authenticateToken, async (req, res) => {
  const user = req.user;

  if (!user?.isSeller) {
    return res.status(403).json({ error: 'Only sellers can create listings.' });
  }

  const { bookId, price, condition } = req.body;

  if (!bookId || typeof price !== 'number' || typeof condition !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid required fields.' });
  }

  try {
    const listing = await prisma.listing.create({
      data: {
        bookId,
        price,
        condition,
        sellerId: user.id,
      },
    });

    res.status(201).json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create listing.' });
  }
});


router.patch('/:id', authenticateToken, async (req, res) => {
  const listingId = Number(req.params.id);
  const { price, condition, available } = req.body;

  if (isNaN(listingId)) {
    return res.status(400).json({ error: 'Invalid listing ID.' });
  }

  try {
    // Get the listing first to confirm ownership
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found.' });
    }

    if (listing.sellerId !== req.user?.id) {
      return res.status(403).json({ error: 'You do not own this listing.' });
    }

    const updated = await prisma.listing.update({
      where: { id: listingId },
      data: {
        price,
        condition,
        available,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update listing.' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  const listingId = Number(req.params.id);

  if (isNaN(listingId)) {
    return res.status(400).json({ error: 'Invalid listing ID.' });
  }

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found.' });
    }

    if (listing.sellerId !== req.user?.id) {
      return res.status(403).json({ error: 'You do not own this listing.' });
    }

    await prisma.listing.delete({
      where: { id: listingId },
    });

    res.status(200).json({ message: 'Listing deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete listing.' });
  }
});


export default router;
 