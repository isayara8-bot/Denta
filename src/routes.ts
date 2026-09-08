import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('./routes/home.tsx'),
  route('services', './routes/services.tsx'),
  route('services/:serviceId', './routes/service-detail.tsx'),
  route('doctors', './routes/doctors.tsx'),
  route('equipment', './routes/equipment.tsx'),
  route('results', './routes/results.tsx'),
  route('reviews', './routes/reviews.tsx'),
  route('contacts', './routes/contacts.tsx'),
  route('privacy', './routes/privacy.tsx'),
  route('*', './routes/not-found.tsx'),
] satisfies RouteConfig;
