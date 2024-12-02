'use client';

import { useState, useEffect } from "react";
import CrimeCard from "../components/CrimeCard/CrimeCard";
import { ICrime } from "../models/crime";

const propertyData = () => {
  const [crimes, setCrimes] = useState<Omit<ICrime, "_id">[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchCrimes = async () => {
      const response = await fetch('/api/crime?collection=property_crimes'); 
      if (response.ok) {
        const data = await response.json();
        setCrimes(data.data); 
      }
    };
    fetchCrimes();
  }, []); 

  const filterArea = () => {
    const filteredCrimes = crimes.filter((crime) =>
      crime.area.toLowerCase().includes(filter.toLowerCase())
    );
      setCrimes(filteredCrimes); 
  };
  const filterDate = () => {
    const filteredCrimes = crimes.filter((crime) =>
      crime.date_rptd.includes(filter.toLowerCase())
    );
      setCrimes(filteredCrimes); 
  };
  const filterDescription = () => {
    const filteredCrimes = crimes.filter((crime) =>
      crime.crm_cd_desc.toLowerCase().includes(filter.toLowerCase())
    );
      setCrimes(filteredCrimes); 
  };
  const filterLocation = () => {
    const filteredCrimes = crimes.filter((crime) =>
      crime.location.toLowerCase().includes(filter.toLowerCase())
    );
      setCrimes(filteredCrimes); 
  };
  const filterVictim = () => {
    const filteredCrimes = crimes.filter((crime) =>
      crime.vict_age.includes(filter)
    );
      setCrimes(filteredCrimes); 
  };
  const filterStatus = () => {
    const filteredCrimes = crimes.filter((crime) =>
      crime.status_desc.toLowerCase().includes(filter.toLowerCase())
    );
      setCrimes(filteredCrimes); 
  };


  const ResetData = async () => {
    const response = await fetch('/api/crime?clear=1&collection=property_crimes'); 
    if (response.ok) {
      const data = await response.json();
      setCrimes(data.data); 
    }
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-top">
        <h1 className="head-text">Property Crime Data</h1>
        <input
        type="text"
        placeholder="Filter by input..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        />
        <button onClick={ResetData}>Reset Data</button>
        </div>
      <div className="button-container">
      <p className="total-counter">Crimes Matched: {crimes.length}</p>
      <button onClick={filterDate}>Filter Date</button>
      <button onClick={filterArea}>Filter Area</button>
      <button onClick={filterDescription}>Filter Description</button>
      <button onClick={filterLocation}>Filter Location</button>
      <button onClick={filterVictim}>Filter Victim Age</button>
      <button onClick={filterStatus}>Filter Status</button>
      </div>
      </div>
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

export default propertyData;
