import type { MetaFunction } from 'react-router';
import { ExternalLink, Quote } from 'lucide-react';
import { AppointmentCta, PageHero } from '../components/SiteSections';
import { REVIEWS, TWO_GIS_URL } from '../data/clinicData';
import { createMeta } from '../lib/seo';

export const meta: MetaFunction = () => createMeta('Отзывы о стоматологии Perfect Dental в Астане', 'Отзывы пациентов о клинике Perfect Dental. Оригиналы и актуальные оценки доступны в карточке клиники в 2GIS.', '/reviews');

export default function ReviewsRoute() {
  return <><PageHero eyebrow="Отзывы пациентов" title="Впечатления людей, которые были в Perfect Dental" description="Показываем короткие выдержки из реальных отзывов. Актуальные оценки и оригинальные тексты всегда можно проверить в 2GIS." /><section className="section-shell py-16 md:py-24"><div className="grid gap-5 md:grid-cols-3">{REVIEWS.map((review) => <article key={review.author} className="flex flex-col rounded-3xl border border-outline-variant/50 bg-white p-7"><Quote className="size-8 text-primary/30" /><p className="mt-5 flex-1 text-base leading-7">{review.text}</p><div className="mt-6 border-t border-outline-variant/50 pt-5"><p className="font-semibold">{review.author}</p><a href={review.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">Открыть источник <ExternalLink className="size-3" /></a></div></article>)}</div><div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-surface-container-low p-6 sm:flex-row sm:items-center"><p className="max-w-2xl text-sm leading-6 text-on-surface-variant">Количество отзывов и оценка меняются, поэтому мы не фиксируем их на сайте.</p><a href={`${TWO_GIS_URL}/tab/reviews`} target="_blank" rel="noreferrer" className="shrink-0 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">Все отзывы в 2GIS</a></div></section><AppointmentCta /></>;
}
