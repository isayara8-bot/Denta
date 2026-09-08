import { useCallback, useEffect, useState, type ReactNode } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from 'react-router';
import type { LinksFunction } from 'react-router';
import { AppointmentProvider, type AppointmentSelection } from './context/AppointmentContext';
import { AppointmentModal } from './components/AppointmentModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CLINIC_INFO, SITE_URL } from './data/clinicData';
import './index.css';

export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/png', href: '/images/brand/perfect-dental-mark.png' },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: CLINIC_INFO.name,
  legalName: CLINIC_INFO.legalName,
  url: SITE_URL,
  telephone: CLINIC_INFO.phoneHref,
  image: `${SITE_URL}/images/brand/perfect-dental-logo.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'проспект Кабанбай батыра, 49',
    addressLocality: 'Астана',
    addressCountry: 'KZ',
  },
  openingHours: ['Mo-Fr 09:00-20:00', 'Sa 09:00-14:00'],
};

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [selection, setSelection] = useState<AppointmentSelection | null>(null);
  const openAppointment = useCallback((next: AppointmentSelection = {}) => setSelection(next), []);
  const closeAppointment = useCallback(() => setSelection(null), []);

  useEffect(() => {
    document.body.style.overflow = selection ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selection]);

  return (
    <AppointmentProvider value={{ openAppointment }}>
      <div className="min-h-screen bg-background text-on-surface flex flex-col antialiased selection:bg-primary selection:text-white">
        <Header />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <MobileBottomNav />
        <AppointmentModal selection={selection} onClose={closeAppointment} />
      </div>
    </AppointmentProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const title = isRouteErrorResponse(error) && error.status === 404 ? 'Страница не найдена' : 'Что-то пошло не так';
  return (
    <div className="min-h-screen grid place-items-center bg-background px-6 text-center">
      <div>
        <img src="/images/brand/perfect-dental-mark.png" alt="Perfect Dental" className="w-20 h-20 object-contain mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-primary">{title}</h1>
        <a href="/" className="inline-flex mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white">
          Вернуться на главную
        </a>
      </div>
    </div>
  );
}
