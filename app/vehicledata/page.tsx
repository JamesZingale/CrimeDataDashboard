'use client';

import { useState, useEffect } from "react";
import CrimeCard from "../components/CrimeCard";
import { ICrime } from "../models/crime";

const PropertyData = () => {
  const [crimes, setCrimes] = useState<Omit<ICrime, "_id">[]>([]);

  useEffect(() => {
    // Fetch data from the API route when the component mounts
    const fetchCrimes = async () => {
      const response = await fetch('/api/crime?collection=property_crimes'); // Request the property crimes collection
      if (response.ok) {
        const data = await response.json();
        setCrimes(data.data); // Set crimes to the state from API response
      }
    };

    fetchCrimes();
  }, []); // Empty dependency array means it runs once when the component mounts

  const filterCrimes = () => {
    // Example filter: Only show crimes that contain the keyword "robbery"
    const filteredCrimes = crimes.filter((crime) =>
      crime.area.toLowerCase().includes("06")
    );
      setCrimes(filteredCrimes); // Update the crimes state with filtered data
  };

  return (
    <div>
      <h1>Property Crime Data</h1>
      <button onClick={filterCrimes}>Filter Robbery Crimes</button>
      {crimes.length > 0 ? (
        crimes.map((crime) => (
          <CrimeCard key={crime.dr_no} crime={crime} />
        ))
      ) : (
        <p>No crime data available.</p>
      )}
    </div>
  );
};

export default PropertyData;
