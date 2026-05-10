import { Router } from 'express';

const router = Router();

// Mock data moved to backend
const activities = [
  {
    id: 1,
    title: 'Alpine Ridge Paragliding',
    rating: 4.9,
    reviews: 128,
    location: 'Interlaken, Switzerland',
    description: 'Experience the thrill of soaring above the Swiss Alps. This tandem flight offers breathtaking panoramic views of the Jungfrau region and pristine alpine lakes.',
    price: 185,
    imageUrl: 'https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?auto=format&fit=crop&q=80',
    category: 'Adventure'
  },
  {
    id: 2,
    title: 'Coastal Sunset Flight',
    rating: 4.8,
    reviews: 84,
    location: 'Oludeniz, Turkey',
    description: 'Glide over the famous Blue Lagoon during golden hour. Launch from Babadağ mountain and enjoy a serene descent over the turquoise waters and white sandy beaches below.',
    price: 140,
    imageUrl: 'https://images.unsplash.com/photo-1549479361-bd804b4d7ed4?auto=format&fit=crop&q=80',
    category: 'Adventure'
  },
  {
    id: 3,
    title: 'Volcanic Crater Glide',
    rating: 4.7,
    reviews: 56,
    location: 'Maui, Hawaii',
    description: 'A unique opportunity to fly near the dormant Haleakalā volcano. Witness dramatic landscapes, unique flora, and sweeping views of the island from a bird\'s-eye perspective.',
    price: 210,
    imageUrl: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80',
    category: 'Adventure'
  }
];

router.get('/', (req, res) => {
  res.json(activities);
});

export default router;
