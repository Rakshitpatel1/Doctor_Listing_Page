
export interface Doctor {
  id: string;
  name: string;
  specialties: string[];
  experience: number;
  fees: number;
  consultationType: 'video' | 'clinic';
  rating: number;
  image: string;
}

