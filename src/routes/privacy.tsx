import type { MetaFunction } from 'react-router';
import { PageHero } from '../components/SiteSections';
import { CLINIC_INFO } from '../data/clinicData';
import { createMeta } from '../lib/seo';

export const meta: MetaFunction = () => createMeta('Политика конфиденциальности — Perfect Dental', 'Порядок обработки персональных данных при записи на консультацию в стоматологию Perfect Dental.', '/privacy');

export default function PrivacyRoute() {
  return <><PageHero eyebrow="Документы" title="Политика конфиденциальности" description="Как Perfect Dental обрабатывает контактные данные, отправленные через форму записи." /><article className="prose-shell py-16 md:py-24"><p className="notice">Дата публикации: 8 сентября 2026 года.</p><h2>1. Общие положения</h2><p>{CLINIC_INFO.legalName}, БИН {CLINIC_INFO.bin}, обрабатывает персональные данные пользователей сайта perfectdental.kz в соответствии с законодательством Республики Казахстан.</p><h2>2. Какие данные мы получаем</h2><p>Через форму записи могут быть переданы имя, номер телефона, выбранная услуга или направление специалиста и комментарий пользователя.</p><h2>3. Цель обработки</h2><p>Данные используются исключительно для связи с пользователем, уточнения запроса и организации записи в клинику.</p><h2>4. Передача и хранение</h2><p>Заявка передаётся уполномоченному администратору клиники через защищённое служебное уведомление. Сайт не создаёт публичную базу заявок и не передаёт данные третьим лицам для рекламы.</p><h2>5. Согласие и отзыв</h2><p>Отправляя форму, пользователь подтверждает согласие на обработку данных. Согласие можно отозвать, связавшись с клиникой по телефону <a href={`tel:${CLINIC_INFO.phoneHref}`}>{CLINIC_INFO.phone}</a>.</p><h2>6. Контакты оператора</h2><p>{CLINIC_INFO.legalName}, БИН {CLINIC_INFO.bin}. Адрес: {CLINIC_INFO.legalAddress}. Телефон: <a href={`tel:${CLINIC_INFO.phoneHref}`}>{CLINIC_INFO.phone}</a>.</p></article></>;
}
