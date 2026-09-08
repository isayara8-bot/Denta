import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { CheckCircle2, CircleAlert, MessageCircle, Phone, Send, X } from 'lucide-react';
import type { AppointmentResponse } from '../types';
import type { AppointmentSelection } from '../context/AppointmentContext';
import { CLINIC_INFO, DOCTORS, SERVICES } from '../data/clinicData';

type Status = 'idle' | 'sending' | 'success' | 'error';
const EMPTY_FORM = { name: '', phone: '', service: '', doctor: '', comment: '', consent: false, website: '' };

interface AppointmentModalProps {
  selection: AppointmentSelection | null;
  onClose: () => void;
}

export function AppointmentModal({ selection, onClose }: AppointmentModalProps) {
  const titleId = useId();
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);

  const closeModal = useCallback(() => {
    setForm(EMPTY_FORM);
    setStatus('idle');
    setErrorMessage('');
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!selection) return;
    setStatus('idle');
    setErrorMessage('');
    setForm((current) => ({ ...current, service: selection.service ?? '', doctor: selection.doctor ?? '' }));
    requestAnimationFrame(() => closeButton.current?.focus());
  }, [selection]);

  useEffect(() => {
    if (!selection) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = dialog.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selection, closeModal]);

  if (!selection) return null;

  const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsappPhone}?text=${encodeURIComponent(
    `Здравствуйте! Хочу записаться в Perfect Dental.\nИмя: ${form.name || 'не указано'}\nТелефон: ${form.phone || 'не указан'}\nУслуга: ${form.service || 'консультация'}${form.comment ? `\nКомментарий: ${form.comment}` : ''}`,
  )}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.consent) {
      setErrorMessage('Заполните имя, телефон и подтвердите согласие на обработку данных.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setErrorMessage('');
    try {
      const endpoint = import.meta.env.VITE_APPOINTMENT_API_URL || '/api/appointments.php';
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const result = (await response.json()) as AppointmentResponse;
      if ('code' in result) throw new Error(result.code);
      if (!response.ok || !result.ok) throw new Error('DELIVERY_ERROR');
      setStatus('success');
    } catch (error) {
      const code = error instanceof Error ? error.message : '';
      setErrorMessage(code === 'RATE_LIMIT' ? 'Заявка уже отправлялась недавно. Позвоните нам или напишите в WhatsApp.' : 'Не удалось отправить заявку. Свяжитесь с нами по телефону или в WhatsApp.');
      setStatus('error');
    }
  }

  return (
    <div role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeModal()} className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#071e20]/70 p-4 backdrop-blur-sm">
      <section ref={dialog} role="dialog" aria-modal="true" aria-labelledby={titleId} className="relative my-6 w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-primary px-6 py-6 pr-16 text-white md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-fixed">Perfect Dental</p>
          <h2 id={titleId} className="mt-1 text-2xl font-bold">Запись на консультацию</h2>
          <p className="mt-2 text-sm text-white/75">Администратор свяжется с вами, чтобы подобрать удобное время.</p>
        </div>
        <button ref={closeButton} type="button" onClick={closeModal} aria-label="Закрыть форму" className="absolute right-4 top-4 rounded-full p-2 text-white hover:bg-white/15"><X /></button>
        {status === 'success' ? (
          <div className="px-6 py-12 text-center md:px-8">
            <CheckCircle2 className="mx-auto size-14 text-primary" />
            <h3 className="mt-5 text-2xl font-bold">Заявка отправлена</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-on-surface-variant">Спасибо! Администратор Perfect Dental свяжется с вами по указанному номеру.</p>
            <button type="button" onClick={closeModal} className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white">Закрыть</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6 md:px-8" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">Имя *<input required maxLength={80} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-field mt-1.5" placeholder="Как к вам обращаться" /></label>
              <label className="text-sm font-semibold">Телефон *<input required maxLength={30} autoComplete="tel" inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="form-field mt-1.5" placeholder="+7 777 000 00 00" /></label>
            </div>
            <label className="block text-sm font-semibold">Услуга<select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="form-field mt-1.5"><option value="">Первичная консультация</option>{SERVICES.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}</select></label>
            <label className="block text-sm font-semibold">Направление специалиста<select value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} className="form-field mt-1.5"><option value="">Подберёт администратор</option>{DOCTORS.map((doctor) => <option key={doctor.id} value={doctor.specialty}>{doctor.specialty}</option>)}</select></label>
            <label className="block text-sm font-semibold">Комментарий<textarea maxLength={500} rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} className="form-field mt-1.5 resize-none" placeholder="Кратко опишите вопрос" /></label>
            <label className="sr-only" aria-hidden="true">Не заполняйте это поле<input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></label>
            <label className="flex items-start gap-3 text-xs leading-5 text-on-surface-variant"><input required type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 size-4 accent-primary" /><span>Я согласен(на) на обработку персональных данных согласно <a href="/privacy" target="_blank" className="underline">политике конфиденциальности</a>.</span></label>
            {status === 'error' && <div role="alert" className="flex gap-3 rounded-xl bg-red-50 p-3 text-sm text-red-800"><CircleAlert className="size-5 shrink-0" />{errorMessage}</div>}
            <button disabled={status === 'sending'} type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60"><Send className="size-4" />{status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}</button>
            {status === 'error' && <div className="grid gap-2 sm:grid-cols-2"><a href={`tel:${CLINIC_INFO.phoneHref}`} className="flex items-center justify-center gap-2 rounded-xl border border-outline-variant px-4 py-3 text-sm font-semibold"><Phone className="size-4" />Позвонить</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"><MessageCircle className="size-4" />WhatsApp</a></div>}
          </form>
        )}
      </section>
    </div>
  );
}
