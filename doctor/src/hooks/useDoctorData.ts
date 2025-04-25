import React from "react"; // Ensure React is imported for hooks
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Doctor } from "../types/doctor";

const fetchDoctors = async (): Promise<Doctor[]> => {
  const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }
  const data = await response.json();

  // Ensure each doctor has a specialties array
  return data.map((doctor: any) => ({
    ...doctor,
    specialties: doctor.specialties || [],
    fees: doctor.fees || "0", // Store as string for display
    experience: doctor.experience || "0", // Store as string for display
  }));
};

export const useDoctorData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get filters from URL params
  const searchQuery = searchParams.get("search") || "";
  const selectedSpecialties = searchParams.get("specialties")?.split(",").filter(Boolean) || [];
  const consultationType = (searchParams.get("consultationType") as "video" | "clinic" | null) || null;
  const sortBy = searchParams.get("sortBy") || "";

  const { data: doctors = [], isLoading, error } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  // Get unique specialties from fetched data
  const specialties = Array.from(
    new Set(doctors.flatMap(doctor => doctor.specialties || []))
  ).sort();

  // Sorting logic based on sortBy value
  const sortedDoctors = React.useMemo(() => {
    let sorted = [...doctors];

    console.log("Before sorting:", sorted); // Debug: check data before sorting

    if (sortBy === "fees-asc") {
      sorted = sorted.sort((a, b) => {
        // Convert fees to numbers for sorting only
        const feeA = Number(a.fees); // Treat as number for sorting
        const feeB = Number(b.fees); // Treat as number for sorting
        return feeA - feeB;
      });
    } else if (sortBy === "experience-asc") {
      sorted = sorted.sort((a, b) => {
        // Convert experience to numbers for sorting only
        const expA = Number(a.experience); // Treat as number for sorting
        const expB = Number(b.experience); // Treat as number for sorting
        return expA - expB;
      });
    }

    console.log("After sorting:", sorted); // Debug: check data after sorting

    return sorted;
  }, [doctors, sortBy]);

  // Update URL params
  const updateFilters = ({
    search,
    specialties,
    consultationType,
    sortBy,
  }: {
    search?: string;
    specialties?: string[];
    consultationType?: "video" | "clinic" | null;
    sortBy?: string;
  }) => {
    const newParams = new URLSearchParams(searchParams);

    if (search !== undefined) {
      if (search) newParams.set("search", search);
      else newParams.delete("search");
    }

    if (specialties !== undefined) {
      if (specialties.length > 0) newParams.set("specialties", specialties.join(","));
      else newParams.delete("specialties");
    }

    if (consultationType !== undefined) {
      if (consultationType) newParams.set("consultationType", consultationType);
      else newParams.delete("consultationType");
    }

    if (sortBy !== undefined) {
      if (sortBy) newParams.set("sortBy", sortBy);
      else newParams.delete("sortBy");
    }

    setSearchParams(newParams);
  };

  return {
    doctors: sortedDoctors, // Return sorted doctors
    specialties,
    isLoading,
    error,
    filters: {
      searchQuery,
      selectedSpecialties,
      consultationType,
      sortBy,
    },
    updateFilters,
  };
};
