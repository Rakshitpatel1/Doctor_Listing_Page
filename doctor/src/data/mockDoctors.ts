
import { Doctor } from '../types/doctor';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialties: ['Cardiology', 'Internal Medicine'],
    experience: 12,
    fees: 150,
    consultationType: 'video',
    rating: 4.8,
    image: 'https://picsum.photos/200',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialties: ['Pediatrics'],
    experience: 8,
    fees: 100,
    consultationType: 'clinic',
    rating: 4.5,
    image: 'https://picsum.photos/201',
  },
  {
    id: '3',
    name: 'Dr. Emma Williams',
    specialties: ['Dermatology'],
    experience: 15,
    fees: 200,
    consultationType: 'video',
    rating: 4.9,
    image: 'https://picsum.photos/202',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialties: ['Orthopedics', 'Sports Medicine'],
    experience: 20,
    fees: 180,
    consultationType: 'clinic',
    rating: 4.7,
    image: 'https://picsum.photos/203',
  },
];

export const specialties = Array.from(
  new Set(doctors.flatMap(doctor => doctor.specialties))
).sort();

