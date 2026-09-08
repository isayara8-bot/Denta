import { Link } from 'react-router';
import { CalendarDays, House, MessageCircle, Phone, Stethoscope } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { useAppointment } from '../context/AppointmentContext';

export function MobileBottomNav() {
  const { openAppointment } = useAppointment();
  const itemClass = 'flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium text-on-surface-variant';
  return (
    <nav aria-label="Быстрые действия" className="fixed inset-x-0 bottom-0 z-50 flex h-[68px] border-t border-outline-variant/50 bg-surface/95 px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,.06)] backdrop-blur-xl md:hidden">
      <Link to="/" className={itemClass}><House className="size-5" />Главная</Link>
      <Link to="/services" className={itemClass}><Stethoscope className="size-5" />Услуги</Link>
      <button type="button" onClick={() => openAppointment()} className={`${itemClass} text-primary`}><span className="grid size-9 place-items-center rounded-full bg-primary text-white"><CalendarDays className="size-4" /></span>Запись</button>
      <a href={`https://wa.me/${CLINIC_INFO.whatsappPhone}`} target="_blank" rel="noreferrer" className={`${itemClass} text-[#168c43]`}><MessageCircle className="size-5" />WhatsApp</a>
      <a href={`tel:${CLINIC_INFO.phoneHref}`} className={itemClass}><Phone className="size-5" />Звонок</a>
    </nav>
  );
}
