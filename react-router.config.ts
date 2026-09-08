import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  buildDirectory: 'build',
  ssr: false,
  prerender: [
    '/',
    '/services',
    '/services/laser-surgery',
    '/services/orthopedics',
    '/services/therapy',
    '/services/orthodontics',
    '/doctors',
    '/equipment',
    '/results',
    '/reviews',
    '/contacts',
    '/privacy',
  ],
} satisfies Config;
