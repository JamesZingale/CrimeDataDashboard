"use client"
// pages/vehicledata/page.tsx
import { useState, useEffect } from "react";
import CrimeCard from "../components/CrimeCard"; // Ensure this path is correct
import { ICrime } from "../models/crime";

const VehicleData = () => {
  const [crimes, setCrimes] = useState<ICrime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/crime?collection=vehicle_crimes");
        const result = await response.json();

        if (result.data && Array.isArray(result.data)) {
          setCrimes(result.data);  // Set the vehicle crimes data
        } else {
          setError("No vehicle crimes found.");
        }
      } catch (error) {
        setError("Failed to fetch crime data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Vehicle Crimes</h1>
      {crimes.length > 0 ? (
        crimes.map((crime) => (
          <CrimeCard key={crime.dr_no} crime={crime} />
        ))
      ) : (
        <p>No vehicle crimes to display.</p>
      )}
    </div>
  );
};

export default VehicleData;