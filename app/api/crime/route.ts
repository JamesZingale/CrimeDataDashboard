import { connectToDatabase } from "@/lib/mongoose";
import Crime, { ICrime } from "../../models/crime";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Connect to the MongoDB database
    await connectToDatabase();

    const existingCount = await Crime.countDocuments({});

    if(existingCount == 0)
    {
      // Fetch crime data from the third-party API
    const apiUrl = "https://data.lacity.org/resource/2nrs-mtv8.json";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch data from the crime API");
    }

    // Parse the JSON data
    const crimeData: Omit<ICrime, "_id">[] = await response.json();

    // Insert the full data into the main collection
    await Crime.insertMany(crimeData, { ordered: false });

    // Categorize data
    const vehicleCrimes = crimeData.filter((crime) =>
      crime.crm_cd_desc?.toLowerCase().includes("vehicle")
    );
    const propertyCrimes = crimeData.filter((crime) =>
      crime.crm_cd_desc?.toLowerCase().includes("robbery")
    );

    // Store categorized data
    const db = Crime.db;
    await db.collection("vehicle_crimes").insertMany(vehicleCrimes, { ordered: false });
    await db.collection("property_crimes").insertMany(propertyCrimes, { ordered: false });
    }
    
    return NextResponse.json({ success: true, message: "Data stored successfully" });
  } catch (error: any) {
    console.error("Error storing crime data:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
