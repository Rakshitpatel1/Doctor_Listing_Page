import React from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FilterPanelProps {
  specialties: string[];
  selectedSpecialties: string[];
  consultationType: 'video' | 'clinic' | null;
  sortBy: string;
  onSpecialtyChange: (specialty: string) => void;
  onConsultationTypeChange: (type: 'video' | 'clinic' | null) => void;
  onSortChange: (sort: string) => void;
}

export const FilterPanel = ({
  specialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange,
}: FilterPanelProps) => {
  // Sorting logic based on selected sort option
  const sortDoctors = (doctors: any[]) => {
    if (sortBy === "fees-asc") {
      return doctors.sort((a, b) => {
        const feeA = parseInt(a.fees, 10);  // Convert fees to number
        const feeB = parseInt(b.fees, 10);  // Convert fees to number
        return feeA - feeB;
      });
    } else if (sortBy === "experience-asc") {
      return doctors.sort((a, b) => {
        const expA = parseInt(a.experience, 10);  // Convert experience to number
        const expB = parseInt(b.experience, 10);  // Convert experience to number
        return expA - expB;
      });
    }
    return doctors;  // No sorting if sortBy is empty or undefined
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm border">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Consultation Type</h3>
        <RadioGroup value={consultationType || ''} onValueChange={(value) => onConsultationTypeChange(value as 'video' | 'clinic' | null)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="video" />
            <Label htmlFor="video">Video Consult</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="clinic" id="clinic" />
            <Label htmlFor="clinic">In Clinic</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Specialties</h3>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={specialty}
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={() => onSpecialtyChange(specialty)}
              />
              <Label htmlFor={specialty}>{specialty}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sort By</h3>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select sort option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fees-asc">Price: Low-High</SelectItem>
            <SelectItem value="experience-asc">Experience: Low-High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
