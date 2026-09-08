import type { MetaFunction } from 'react-router';
import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AppointmentCta, BenefitsList, PageHero } from '../components/SiteSections';
import { getService, SERVICES } from '../data/clinicData';
import { createMeta } from '../lib/seo';

export const meta: MetaFunction = ({ params }) => {
  const service = getService(params.serviceId);
  return service ? createMeta(`${service.title} в Астане — Perfect Dental`, service.description, `/services/${service.id}`) : createMeta('Услуга не найдена — Perfect Dental', 'Запрошенная услуга не найдена.', '/services');
};

export default function ServiceDetailRoute() {
  const { serviceId } = useParams();
  const service = getService(serviceId);
  if (!service) return <main className="section-shell py-24"><h1 className="text-4xl font-bold">Услуга не найдена</h1><Link to="/services" className="mt-6 inline-flex items-center gap-2 text-primary"><ArrowLeft className="size-4" />Вернуться к услугам</Link></main>;
  const Icon = service.icon;
  const related = SERVICES.filter((item) => item.id !== service.id);
  return <><PageHero eyebrow={service.eyebrow} title={service.title} description={service.intro}><div className="rounded-3xl border border-white/15 bg-white/10 p-7"><Icon className="size-10 text-primary-fixed" /><p className="mt-5 text-sm leading-6 text-white/75">Стоимость определяется после консультации и диагностики. План лечения составляется индивидуально.</p></div></PageHero><section className="section-shell grid gap-12 py-16 md:py-24 lg:grid-cols-[1fr_.8fr]"><div><p className="eyebrow text-primary">Что входит в направление</p><h2 className="section-title mt-3">Возможности лечения</h2><div className="mt-7"><BenefitsList items={service.highlights} /></div></div><aside className="rounded-3xl bg-surface-container-low p-7"><h2 className="text-xl font-bold">Как начинается лечение</h2><ol className="mt-5 space-y-4 text-sm leading-6 text-on-surface-variant"><li><strong className="text-primary">01.</strong> Консультация и сбор информации</li><li><strong className="text-primary">02.</strong> Диагностика по показаниям</li><li><strong className="text-primary">03.</strong> Обсуждение плана и стоимости</li><li><strong className="text-primary">04.</strong> Лечение и контроль результата</li></ol></aside></section><section className="bg-surface-container-low py-16"><div className="section-shell"><h2 className="text-2xl font-bold">Другие направления</h2><div className="mt-6 grid gap-3 md:grid-cols-3">{related.map((item) => <Link key={item.id} to={`/services/${item.id}`} className="group flex items-center justify-between rounded-2xl bg-white p-5 text-sm font-semibold shadow-sm">{item.shortTitle}<ArrowRight className="size-4 text-primary transition group-hover:translate-x-1" /></Link>)}</div></div></section><AppointmentCta service={service.title} title={`Записаться: ${service.shortTitle}`} /></>;
}
