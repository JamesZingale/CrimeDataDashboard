import React from "react";
import { ICrime } from "../models/crime";

interface CrimeCardProps {
  crime: Omit<ICrime, "_id">;
}

const CrimeCard = ({ crime }: CrimeCardProps) => {
  return (
    <div className="crime-card">
      <h3>{crime.dr_no}</h3>
      <p><strong>Date Reported:</strong> {new Date(crime.date_rptd).toLocaleDateString()}</p>
      <p><strong>Area:</strong> {crime.area}</p>
      <p><strong>Description:</strong> {crime.crm_cd_desc}</p>
      <p><strong>Location:</strong> {crime.location}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default CrimeCard;
