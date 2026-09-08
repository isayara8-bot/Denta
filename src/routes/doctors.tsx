import type { MetaFunction } from 'react-router';
import { UserRound } from 'lucide-react';
import { AppointmentCta, PageHero } from '../components/SiteSections';
import { DOCTORS } from '../data/clinicData';
import { useAppointment } from '../context/AppointmentContext';
import { createMeta } from '../lib/seo';

export const meta: MetaFunction = () => createMeta('Врачи стоматологии Perfect Dental в Астане', 'Специалисты Perfect Dental по хирургии, ортопедии, терапии, эндодонтии и ортодонтии.', '/doctors');

export default function DoctorsRoute() {
  const { openAppointment } = useAppointment();
  return <><PageHero eyebrow="Команда клиники" title="Специалисты по ключевым направлениям стоматологии" description="Страница подготовлена для размещения реальных фотографий и анкет врачей. Мы не используем вымышленные имена, стаж или достижения." /><section className="section-shell py-16 md:py-24"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{DOCTORS.map((doctor) => <article key={doctor.id} className="overflow-hidden rounded-3xl border border-outline-variant/50 bg-white"><div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-primary/5 to-primary/15"><div className="grid size-24 place-items-center rounded-full bg-white/70 text-primary shadow-sm"><UserRound className="size-11" /></div></div><div className="p-6"><p className="eyebrow text-primary">Направление</p><h2 className="mt-2 text-xl font-bold">{doctor.specialty}</h2><p className="mt-3 text-sm leading-6 text-on-surface-variant">{doctor.description}</p><p className="mt-4 rounded-xl bg-surface-container-low p-3 text-xs leading-5 text-on-surface-variant">Информация о специалисте обновляется.</p><button type="button" onClick={() => openAppointment({ doctor: doctor.specialty })} className="mt-5 text-sm font-semibold text-primary">Записаться по направлению →</button></div></article>)}</div></section><AppointmentCta /></>;
}
