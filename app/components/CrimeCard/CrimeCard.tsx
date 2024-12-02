import React from "react";
import { ICrime } from "../../models/crime";
import "./CrimeCard.css";

interface CrimeCardProps {
  crime: Omit<ICrime, "_id">;
}

const CrimeCard = ({ crime }: CrimeCardProps) => {
  return (
    <div className="crime-card">
        <div>
            {crime.dr_no}
        </div>
      <p><strong>Date Reported:</strong> {new Date(crime.date_rptd).toLocaleDateString()}</p>
      <p><strong>Area:</strong> {crime.area}</p>
      <p><strong>Description:</strong> {crime.crm_cd_desc}</p>
      <p><strong>Location:</strong> {crime.location}</p>
      <p><strong>Vict Age:</strong> {crime.vict_age}</p>
      <p><strong>Vict Sex:</strong> {crime.vict_sex}</p>
      <p><strong>Status:</strong> {crime.status_desc}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default CrimeCard;
