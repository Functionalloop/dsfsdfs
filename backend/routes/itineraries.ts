import { Router } from 'express';

const router = Router();

const itineraries = [
  {
    id: 1,
    title: 'Parisian Autumn Escape',
    status: 'Ongoing',
    startDate: 'Oct 12',
    endDate: 'Oct 20, 2024',
    description: 'A luxurious culinary and cultural journey through the heart of Paris, featuring private museum tours and Seine dining.',
    imageUrl: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&q=80',
    members: ['JD', 'SA'],
    badge: 'Active',
    badgeType: 'active'
  },
  {
    id: 2,
    title: 'Kyoto Sakura Season',
    status: 'Upcoming',
    startDate: 'Apr 05',
    endDate: 'Apr 18, 2025',
    daysAway: '42 Days Away',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80',
    tag: 'Planning',
    badgeType: 'upcoming'
  },
  {
    id: 3,
    title: 'Dubai Tech Summit',
    status: 'Upcoming',
    startDate: 'Jun 10',
    endDate: 'Jun 15, 2025',
    daysAway: '3 Months Away',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80',
    tag: 'Booked',
    badgeType: 'upcoming'
  },
  {
    id: 4,
    title: 'Maldives Retreat',
    status: 'Completed',
    date: 'Jan 2024',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80'
  },
  {
    id: 5,
    title: 'NYC Weekend',
    status: 'Completed',
    date: 'Nov 2023',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80'
  }
];

router.get('/', (req, res) => {
  const grouped = {
    ongoing: itineraries.filter(i => i.status === 'Ongoing'),
    upcoming: itineraries.filter(i => i.status === 'Upcoming'),
    completed: itineraries.filter(i => i.status === 'Completed')
  };
  res.json(grouped);
});

export default router;
