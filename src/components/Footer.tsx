import { Link } from 'react-router';
import { Clock3, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CLINIC_INFO, TWO_GIS_ROUTE_URL } from '../data/clinicData';
import { useAppointment } from '../context/AppointmentContext';

export function Footer() {
  const { openAppointment } = useAppointment();
  return (
    <footer className="border-t border-outline-variant/50 bg-surface-container pb-24 pt-14 md:pb-10">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <Link to="/" aria-label="Perfect Dental — главная"><img src="/images/brand/perfect-dental-logo.png" alt="Perfect Dental" className="h-20 w-auto object-contain" /></Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-on-surface-variant">{CLINIC_INFO.description}</p>
          <button type="button" onClick={() => openAppointment()} className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-container">Записаться на консультацию</button>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface">Навигация</h2>
          <ul className="mt-4 space-y-3 text-sm text-on-surface-variant">
            <li><Link to="/services" className="hover:text-primary">Услуги</Link></li><li><Link to="/doctors" className="hover:text-primary">Специалисты</Link></li><li><Link to="/equipment" className="hover:text-primary">Оборудование</Link></li><li><Link to="/results" className="hover:text-primary">Работы клиники</Link></li><li><Link to="/reviews" className="hover:text-primary">Отзывы</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface">Контакты</h2>
          <div className="mt-4 space-y-4 text-sm text-on-surface-variant">
            <a href={TWO_GIS_ROUTE_URL} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-primary"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" />{CLINIC_INFO.address}</a>
            <a href={`tel:${CLINIC_INFO.phoneHref}`} className="flex gap-3 hover:text-primary"><Phone className="size-4 shrink-0 text-primary" />{CLINIC_INFO.phone}</a>
            <a href={`https://wa.me/${CLINIC_INFO.whatsappPhone}`} target="_blank" rel="noreferrer" className="flex gap-3 text-[#168c43]"><MessageCircle className="size-4 shrink-0" />WhatsApp</a>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface">Режим работы</h2>
          <div className="mt-4 flex gap-3 text-sm leading-7 text-on-surface-variant"><Clock3 className="mt-1.5 size-4 shrink-0 text-primary" /><p>{CLINIC_INFO.workingHours.weekdays}<br />{CLINIC_INFO.workingHours.saturday}<br />{CLINIC_INFO.workingHours.sunday}</p></div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1280px] flex-col gap-3 border-t border-outline-variant/50 px-5 pt-6 text-xs text-on-surface-variant md:flex-row md:items-center md:justify-between md:px-6">
        <p>© 2026 Perfect Dental. {CLINIC_INFO.legalName}, БИН {CLINIC_INFO.bin}.</p>
        <div className="flex flex-wrap gap-4"><Link to="/privacy" className="hover:text-primary">Политика конфиденциальности</Link><Link to="/contacts" className="hover:text-primary">Юридическая информация</Link></div>
      </div>
    </footer>
  );
}
