import React, { useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { DoctorCard } from '../components/DoctorCard';
import { useDoctorData } from '../hooks/useDoctorData';

const Index = () => {
  const { 
    doctors,
    specialties,
    isLoading,
    filters: {
      searchQuery,
      selectedSpecialties,
      consultationType,
      sortBy,
    },
    updateFilters,
  } = useDoctorData();

  const searchSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    return Array.from(new Set(
      doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(doctor => doctor.name)
    )).slice(0, 3);
  }, [searchQuery, doctors]);

  const filteredDoctors = useMemo(() => {
    let filtered = doctors;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply specialty filter
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(doctor =>
        doctor.specialties?.some(specialty => selectedSpecialties.includes(specialty)) || false
      );
    }

    // Apply consultation type filter
    if (consultationType) {
      filtered = filtered.filter(doctor => doctor.consultationType === consultationType);
    }

    // Apply sorting
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === 'fees-asc') {
          return a.fees - b.fees;
        } else if (sortBy === 'experience-asc') {
          return a.experience - b.experience;
        }
        return 0;
      });
    }

    return filtered;
  }, [doctors, searchQuery, selectedSpecialties, consultationType, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading doctors...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Find Your Doctor</h1>
          <SearchBar 
            onSearch={(query) => updateFilters({ search: query })} 
            suggestions={searchSuggestions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6">
          <FilterPanel
            specialties={specialties}
            selectedSpecialties={selectedSpecialties}
            consultationType={consultationType}
            sortBy={sortBy}
            onSpecialtyChange={(specialty) => {
              const newSpecialties = selectedSpecialties.includes(specialty)
                ? selectedSpecialties.filter(s => s !== specialty)
                : [...selectedSpecialties, specialty];
              updateFilters({ specialties: newSpecialties });
            }}
            onConsultationTypeChange={(type) => updateFilters({ consultationType: type })}
            onSortChange={(sort) => updateFilters({ sortBy: sort })}
          />

          <div className="space-y-4">
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No doctors found matching your criteria
              </div>
            ) : (
              filteredDoctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
