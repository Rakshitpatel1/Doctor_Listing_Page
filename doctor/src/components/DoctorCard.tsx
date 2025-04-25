import React, { useEffect, useState } from 'react';
import { Doctor } from '../types/doctor';
import { cn } from '@/lib/utils';
import { MapPin, Book, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface DoctorCardProps {
  doctor: Doctor;
}

interface DoctorFromAPI {
  name: string;
  specialities?: { name: string }[];
  experience?: string;
  fees?: string;
  // any other fields from API...
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const [specialties, setSpecialties] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then(res => res.json())
      .then((data: DoctorFromAPI[]) => {
        const match = data.find(d => d.name.toLowerCase() === doctor.name.toLowerCase());
        if (match && match.specialities) {
          setSpecialties(match.specialities.map(s => s.name));
        } else {
          setSpecialties(['General Medicine']);
        }
      })
      .catch(() => {
        setSpecialties(['General Medicine']);
      });
  }, [doctor.name]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border transition-all hover:shadow-md">
      <div className="flex items-start gap-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {specialties.length > 0 ? specialties.join(', ') : 'General Medicine'}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">{doctor.experience}</span>
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-900">{doctor.fees}</span>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Book className="h-4 w-4 text-gray-400" />
              <span>{specialties[0] || 'General Medicine'}</span>
            </div>
          </div>

          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};
