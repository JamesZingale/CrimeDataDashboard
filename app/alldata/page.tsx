import { connectToDatabase } from "@/lib/mongoose";
import Crime, { ICrime } from "../models/crime";

const AllData = async () => {
  // Connect to the database and fetch data

  await fetch("http://localhost:3000/api/crime");

  await connectToDatabase();
  const crimes: Omit<ICrime, "_id">[] = await Crime.find({}); // Fetch all crime data

  return (
    <div>
      <h1>All Crime Data</h1>
      {crimes.length > 0 ? (
        crimes.map((crime) => (
          <div key={crime.dr_no}>
            <p>{crime.crm_cd_desc} - {crime.area_name}</p>
          </div>
        ))
      ) : (
        <p>No crime data available.</p>
      )}
    </div>
  );
};

export default AllData;