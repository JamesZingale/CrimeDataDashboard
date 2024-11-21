import { connectToDatabase } from "@/lib/mongoose";
import Crime, { ICrime } from "../../models/crime";
import { NextRequest, NextResponse } from "next/server";

// Fetch crime data from the third-party API and insert it into the local database
export async function GET(): Promise<NextResponse> {
  try {
    // Connect to the in-memory MongoDB database
    await connectToDatabase();

    // Replace with the actual API URL directly in the code
    const apiUrl = "https://data.lacity.org/resource/2nrs-mtv8.json"; // Directly insert the URL here

    // Fetch crime data from the third-party API
    // Fetch crime data from the third-party API
    const response = await fetch(apiUrl);
    if (!response.ok) {
    throw new Error("Failed to fetch data from the crime API");
    }

    // Log the raw response for debugging
    const rawData = await response.text();
    console.log("Raw data from API:", rawData);

    // Parse the JSON data
    const crimeData: ICrime[] = JSON.parse(rawData);

    // Insert crime data into the MongoDB database
    const result = await Crime.insertMany(crimeData, { ordered: false });

    // Respond with success message
    return NextResponse.json({ result, success: true, insertedCount: result.length}, { status: 201 });
  } catch (error: any) {
    console.error("Error fetching and inserting crime data:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}