import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { ArrowRight, MapPin, Microscope, ScanLine, Sparkles } from 'lucide-react';
import { AppointmentCta, BenefitsList, ServiceGrid } from '../components/SiteSections';
import { CLINIC_INFO, EQUIPMENT, REVIEWS, TWO_GIS_ROUTE_URL, TWO_GIS_URL } from '../data/clinicData';
import { useAppointment } from '../context/AppointmentContext';
import { createMeta } from '../lib/seo';

export const meta: MetaFunction = () => createMeta('Perfect Dental — стоматология в Астане', 'Современная стоматология Perfect Dental в Астане: имплантация, коронки и виниры, лечение под микроскопом, элайнеры и брекеты.');

export default function HomeRoute() {
  const { openAppointment } = useAppointment();
  return (
    <>
      <section className="hero-grid overflow-hidden bg-primary text-white">
        <div className="mx-auto grid min-h-[680px] max-w-[1280px] items-center gap-12 px-5 py-14 md:px-6 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
          <div>
            <p className="eyebrow text-primary-fixed">{CLINIC_INFO.tagline}</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.03] tracking-[-0.045em] sm:text-6xl lg:text-7xl">Точное лечение. Спокойная атмосфера.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75 md:text-lg">{CLINIC_INFO.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => openAppointment()} className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary hover:bg-primary-fixed">Записаться на консультацию</button>
              <a href={TWO_GIS_ROUTE_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"><MapPin className="size-4" />Построить маршрут</a>
            </div>
            <p className="mt-5 text-sm text-white/60">Стоимость лечения определяется после консультации и диагностики.</p>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-8 rounded-full bg-primary-fixed/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
              <img src="/images/equipment/doctor-smile-pluser.webp" alt="Стоматологический лазер Doctor Smile Pluser в клинике Perfect Dental" width="830" height="609" fetchPriority="high" className="aspect-[4/3] w-full rounded-[24px] bg-white object-cover" />
              <div className="grid grid-cols-2 gap-3 p-3 pb-1"><div className="rounded-2xl bg-white/10 p-4"><Sparkles className="size-5 text-primary-fixed" /><p className="mt-2 text-xs text-white/60">Технология</p><p className="text-sm font-semibold">Лазерные протоколы</p></div><div className="rounded-2xl bg-white/10 p-4"><Microscope className="size-5 text-primary-fixed" /><p className="mt-2 text-xs text-white/60">Точность</p><p className="text-sm font-semibold">Лечение под микроскопом</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow text-primary">Направления лечения</p><h2 className="section-title mt-3">Комплексный подход к здоровью улыбки</h2></div><Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Все услуги <ArrowRight className="size-4" /></Link></div>
        <ServiceGrid compact />
      </section>

      <section className="bg-surface-container-low py-16 md:py-24">
        <div className="section-shell grid items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4"><img src={EQUIPMENT[1].image} alt={EQUIPMENT[1].alt} width="588" height="330" loading="lazy" className="col-span-2 aspect-[16/9] w-full rounded-3xl object-cover" /><img src={EQUIPMENT[2].image} alt={EQUIPMENT[2].alt} width="400" height="400" loading="lazy" className="aspect-square w-full rounded-3xl object-cover" /><div className="flex aspect-square flex-col justify-end rounded-3xl bg-primary p-6 text-white"><ScanLine className="size-8 text-primary-fixed" /><p className="mt-5 text-xl font-bold">Цифровое планирование</p></div></div>
          <div><p className="eyebrow text-primary">Оснащение клиники</p><h2 className="section-title mt-3">Технологии помогают врачу видеть больше</h2><p className="mt-5 text-base leading-7 text-on-surface-variant">Диагностика, увеличение и цифровые инструменты дают больше данных для планирования лечения. Оборудование применяется только по медицинским показаниям.</p><div className="mt-7"><BenefitsList items={['Лазер Doctor Smile Pluser', 'Цифровая 3D-диагностика', 'Внутриротовое сканирование', 'Лечение корневых каналов под микроскопом']} /></div><Link to="/equipment" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">Подробнее об оборудовании <ArrowRight className="size-4" /></Link></div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-24">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow text-primary">Отзывы пациентов</p><h2 className="section-title mt-3">О клинике говорят пациенты</h2></div><a href={`${TWO_GIS_URL}/tab/reviews`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary">Все отзывы в 2GIS →</a></div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">{REVIEWS.map((review) => <blockquote key={review.author} className="rounded-3xl border border-outline-variant/50 bg-white p-6"><p className="text-base leading-7">«{review.text}»</p><footer className="mt-5 text-sm font-semibold text-primary">{review.author}<span className="block text-xs font-normal text-outline">Отзыв в 2GIS</span></footer></blockquote>)}</div>
      </section>
      <AppointmentCta />
    </>
  );
}
