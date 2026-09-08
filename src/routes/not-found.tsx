import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Страница не найдена — Perfect Dental' }, { name: 'robots', content: 'noindex, nofollow' }];

export default function NotFoundRoute() {
  return <section className="section-shell grid min-h-[62vh] place-items-center py-20 text-center"><div><p className="text-7xl font-bold text-primary/20">404</p><h1 className="mt-4 text-3xl font-bold">Страница не найдена</h1><p className="mt-3 text-on-surface-variant">Возможно, адрес изменился или в нём есть опечатка.</p><Link to="/" className="mt-7 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white">Вернуться на главную</Link></div></section>;
}
