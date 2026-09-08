import type { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: 'laser-surgery' | 'orthopedics' | 'therapy' | 'orthodontics';
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  intro: string;
  highlights: string[];
  icon: LucideIcon;
}

export interface DoctorPlaceholder {
  id: string;
  specialty: string;
  description: string;
  serviceId: ServiceItem['id'];
}

export interface EquipmentItem {
  id: string;
  title: string;
  model?: string;
  description: string;
  benefits: string[];
  image: string;
  alt: string;
}

export interface ReviewItem {
  author: string;
  text: string;
  sourceUrl: string;
}

export interface AppointmentPayload {
  name: string;
  phone: string;
  service: string;
  doctor: string;
  comment: string;
  consent: boolean;
  website: string;
}

export type AppointmentCode = 'VALIDATION_ERROR' | 'RATE_LIMIT' | 'DELIVERY_ERROR';

export type AppointmentResponse =
  | { ok: true }
  | { ok: false; code: AppointmentCode };
