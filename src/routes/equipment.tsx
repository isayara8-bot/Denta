import type { MetaFunction } from 'react-router';
import { AppointmentCta, BenefitsList, PageHero } from '../components/SiteSections';
import { EQUIPMENT } from '../data/clinicData';
import { createMeta } from '../lib/seo';

export const meta: MetaFunction = () => createMeta('Оборудование Perfect Dental — стоматология в Астане', 'Лазер Doctor Smile Pluser, цифровая 3D-диагностика и внутриротовое сканирование в Perfect Dental.', '/equipment');

export default function EquipmentRoute() {
  return <><PageHero eyebrow="Технологии Perfect Dental" title="Оборудование для точной диагностики и лечения" description="Технологии не заменяют клиническое мышление врача, а дают ему больше данных для планирования и контроля лечения." /><section className="section-shell space-y-8 py-16 md:py-24">{EQUIPMENT.map((item, index) => <article key={item.id} className="grid overflow-hidden rounded-[32px] border border-outline-variant/50 bg-white lg:grid-cols-2"><img src={item.image} alt={item.alt} width={index === 0 ? 830 : index === 1 ? 588 : 400} height={index === 0 ? 609 : index === 1 ? 330 : 400} loading={index === 0 ? 'eager' : 'lazy'} className={`h-full min-h-[320px] w-full bg-surface-container-low object-cover ${index % 2 ? 'lg:order-2' : ''}`} /><div className="p-7 md:p-10"><p className="eyebrow text-primary">{item.model ?? 'Цифровое оборудование'}</p><h2 className="mt-3 text-3xl font-bold tracking-tight">{item.title}</h2><p className="mt-5 text-base leading-7 text-on-surface-variant">{item.description}</p><div className="mt-7"><BenefitsList items={item.benefits} /></div>{!item.model && <p className="mt-6 rounded-xl bg-surface-container-low p-4 text-xs leading-5 text-on-surface-variant">Модель оборудования будет указана после подтверждения технических данных клиникой.</p>}</div></article>)}</section><AppointmentCta title="Узнайте, какая диагностика нужна именно вам" /></>;
}
