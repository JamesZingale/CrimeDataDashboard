import { connectToDatabase } from "@/lib/mongoose";
import Crime, { ICrime } from "../../models/crime";
import { NextResponse, NextRequest } from "next/server";



export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  const collectionName = url.searchParams.get("collection") || "all_crimes";  // Default to 'all_crimes' if no collection is specified

  try {
    // Connect to the MongoDB database
    await connectToDatabase();

    // Fetch crime data from the third-party API
    const apiUrl = "https://data.lacity.org/resource/2nrs-mtv8.json";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch data from the crime API");
    }

    // Parse the JSON data
    const crimeData: Omit<ICrime, "_id">[] = await response.json();

    // Insert the full data into the main collection
    const mainInsertResult = await Crime.insertMany(crimeData, { ordered: false });

    // Segregate data into different categories                                                         //these will need change
    const vehicleCrimes = crimeData.filter((crime) =>
      crime.crm_cd_desc?.toLowerCase().includes("vehicle")
    );
    const propertyCrimes = crimeData.filter((crime) =>
      crime.crm_cd_desc?.toLowerCase().includes("robbery")
    );

    // Insert categorized data into separate collections
    const db = Crime.db; // Access the database connection
    await db.collection("vehicle_crimes").insertMany(vehicleCrimes, { ordered: false });
    await db.collection("property_crimes").insertMany(propertyCrimes, { ordered: false });

    // Fetch data from the requested collection
    let collectionData;
    if (collectionName === "vehicle_crimes") {
      collectionData = await db.collection("vehicle_crimes").find().toArray();
    } else if (collectionName === "property_crimes") {
      collectionData = await db.collection("property_crimes").find().toArray();
    } else {
      collectionData = crimeData; // Default to all crimes
    }

    // Respond with success message and the requested data
    return NextResponse.json(
      {
        data: collectionData
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching and inserting crime data:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
