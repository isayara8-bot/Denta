import type { MetaFunction } from 'react-router';
import { Camera, ShieldCheck } from 'lucide-react';
import { AppointmentCta, PageHero } from '../components/SiteSections';
import { createMeta } from '../lib/seo';

export const meta: MetaFunction = () => createMeta('Работы стоматологии Perfect Dental', 'Клинические работы Perfect Dental будут опубликованы после получения подтверждённых материалов и согласий пациентов.', '/results');

export default function ResultsRoute() {
  return <><PageHero eyebrow="Работы клиники" title="Реальные результаты — только с согласия пациентов" description="Мы не размещаем вымышленные клинические случаи. Раздел подготовлен для подтверждённых фотографий лечения с корректным описанием." /><section className="section-shell py-16 md:py-24"><div className="grid gap-5 md:grid-cols-2"><article className="rounded-3xl bg-surface-container-low p-8"><Camera className="size-9 text-primary" /><h2 className="mt-6 text-2xl font-bold">Фотографии готовятся к публикации</h2><p className="mt-3 text-sm leading-6 text-on-surface-variant">После получения материалов здесь появятся работы по имплантации, ортопедии, терапии и ортодонтии — без ретуши, искажающей результат.</p></article><article className="rounded-3xl bg-primary p-8 text-white"><ShieldCheck className="size-9 text-primary-fixed" /><h2 className="mt-6 text-2xl font-bold">Конфиденциальность пациента</h2><p className="mt-3 text-sm leading-6 text-white/70">Каждый кейс публикуется только после согласия пациента. Результат лечения индивидуален и не является обещанием аналогичного результата.</p></article></div></section><AppointmentCta /></>;
}
