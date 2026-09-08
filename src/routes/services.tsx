import type { MetaFunction } from 'react-router';
import { AppointmentCta, PageHero, ServiceGrid } from '../components/SiteSections';
import { createMeta } from '../lib/seo';

export const meta: MetaFunction = () => createMeta('Услуги стоматологии Perfect Dental в Астане', 'Имплантация и лазерная хирургия, коронки и виниры, лечение под микроскопом, элайнеры и брекет-системы.', '/services');

export default function ServicesRoute() {
  return <><PageHero eyebrow="Услуги Perfect Dental" title="Лечение, основанное на диагностике" description="Объём и последовательность процедур врач определяет после осмотра и диагностики. До начала лечения вы получаете понятный план и ответы на вопросы." /><section className="section-shell py-16 md:py-24"><ServiceGrid /><div className="mt-8 rounded-2xl bg-surface-container p-5 text-sm leading-6 text-on-surface-variant"><strong className="text-on-surface">О стоимости:</strong> финальная стоимость зависит от клинической ситуации, выбранных материалов и объёма лечения. Она определяется после консультации.</div></section><AppointmentCta /></>;
}
