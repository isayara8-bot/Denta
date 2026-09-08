import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { CalendarDays, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { useAppointment } from '../context/AppointmentContext';

const navLinks = [
  { to: '/services', label: 'Услуги' },
  { to: '/doctors', label: 'Врачи' },
  { to: '/equipment', label: 'Оборудование' },
  { to: '/results', label: 'Работы' },
  { to: '/reviews', label: 'Отзывы' },
  { to: '/contacts', label: 'Контакты' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { openAppointment } = useAppointment();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/40 bg-surface/95 backdrop-blur-xl">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">
        Перейти к содержанию
      </a>
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-5 px-5 md:px-6">
        <Link to="/" aria-label="Perfect Dental — главная" className="shrink-0">
          <img src="/images/brand/perfect-dental-logo.png" alt="Perfect Dental" className="h-14 w-auto object-contain" />
        </Link>
        <nav aria-label="Основная навигация" className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `border-b-2 py-2 text-sm font-medium transition-colors ${isActive ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-primary'}`}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${CLINIC_INFO.phoneHref}`} className="hidden items-center gap-2 text-sm font-semibold text-primary xl:flex"><Phone className="size-4" aria-hidden="true" />{CLINIC_INFO.phone}</a>
          <button type="button" onClick={() => openAppointment()} className="hidden rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-container md:inline-flex">Записаться</button>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} className="rounded-xl p-2.5 text-primary hover:bg-surface-container lg:hidden">
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-outline-variant/40 bg-surface px-5 py-5 shadow-xl lg:hidden">
          <nav aria-label="Мобильная навигация" className="mx-auto grid max-w-[1280px] grid-cols-2 gap-2">
            {navLinks.map((link) => <NavLink key={link.to} to={link.to} className="rounded-xl bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface">{link.label}</NavLink>)}
          </nav>
          <div className="mx-auto mt-4 flex max-w-[1280px] gap-2">
            <button type="button" onClick={() => openAppointment()} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white"><CalendarDays className="size-4" aria-hidden="true" /> Записаться</button>
            <a href={`https://wa.me/${CLINIC_INFO.whatsappPhone}`} target="_blank" rel="noreferrer" aria-label="Написать в WhatsApp" className="grid size-12 place-items-center rounded-xl bg-[#25D366] text-white"><MessageCircle className="size-5" aria-hidden="true" /></a>
          </div>
        </div>
      )}
    </header>
  );
}
