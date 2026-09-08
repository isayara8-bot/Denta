import type { ReactNode } from 'react';
import { ArrowRight, Check, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';
import { useAppointment } from '../context/AppointmentContext';

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <section className="hero-grid overflow-hidden bg-primary text-white">
      <div className="mx-auto grid min-h-[360px] max-w-[1280px] items-center gap-10 px-5 py-16 md:px-6 lg:grid-cols-[1fr_.8fr] lg:py-20">
        <div>
          <p className="eyebrow text-primary-fixed">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">{description}</p>
        </div>
        {children && <div>{children}</div>}
      </div>
    </section>
  );
}

export function ServiceGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {SERVICES.map((service, index) => {
        const Icon = service.icon;
        return (
          <Link key={service.id} to={`/services/${service.id}`} className="group rounded-3xl border border-outline-variant/50 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg md:p-8">
            <div className="flex items-start justify-between gap-5">
              <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-6" /></span>
              <span className="text-xs font-semibold text-outline">0{index + 1}</span>
            </div>
            <p className="eyebrow mt-7 text-primary">{service.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">{service.title}</h2>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">{service.description}</p>
            {!compact && <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Подробнее <ArrowRight className="size-4 transition group-hover:translate-x-1" /></p>}
          </Link>
        );
      })}
    </div>
  );
}

export function BenefitsList({ items }: { items: string[] }) {
  return <ul className="grid gap-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-on-surface-variant"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"><Check className="size-3" /></span>{item}</li>)}</ul>;
}

export function AppointmentCta({ title = 'Начните с консультации', description = 'Оставьте контакты — администратор уточнит задачу и предложит удобное время приёма.', service }: { title?: string; description?: string; service?: string }) {
  const { openAppointment } = useAppointment();
  return (
    <section className="px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 overflow-hidden rounded-[32px] bg-primary p-8 text-white md:flex-row md:items-center md:p-12">
        <div><p className="eyebrow text-primary-fixed">Запись в Perfect Dental</p><h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 md:text-base">{description}</p></div>
        <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          <button type="button" onClick={() => openAppointment({ service })} className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary hover:bg-primary-fixed">Оставить заявку</button>
          <a href={`https://wa.me/${CLINIC_INFO.whatsappPhone}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"><MessageCircle className="size-4" />WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

export function ContactStrip() {
  return <div className="grid gap-3 sm:grid-cols-2"><a href={`tel:${CLINIC_INFO.phoneHref}`} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-white"><Phone className="size-5" /><span><span className="block text-xs text-white/60">Телефон</span><strong>{CLINIC_INFO.phone}</strong></span></a><a href={`https://wa.me/${CLINIC_INFO.whatsappPhone}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-white"><MessageCircle className="size-5" /><span><span className="block text-xs text-white/60">Написать</span><strong>WhatsApp</strong></span></a></div>;
}
