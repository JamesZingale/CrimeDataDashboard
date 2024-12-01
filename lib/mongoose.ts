import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let isConnected = false; // Track the connection state
let mongoMemoryServer: MongoMemoryServer | null = null;

export async function connectToDatabase(): Promise<mongoose.Connection> {
  // Use existing connection if already established
  if (mongoose.connection.readyState === 1) {
    console.log("Using existing MongoDB connection");
    return mongoose.connection;
  }

  try {
    // Start the in-memory MongoDB server only once
    if (!mongoMemoryServer) {
      mongoMemoryServer = await MongoMemoryServer.create();
    }

    const mongoURI = mongoMemoryServer.getUri();

    // Connect to the in-memory database only if not already connected
    if (!isConnected) {
      await mongoose.connect(mongoURI);
      isConnected = true;
      console.log("Connected to In-Memory MongoDB");
    }

    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

export async function disconnectDatabase(): Promise<void> {
  if (isConnected) {
    await mongoose.disconnect();
    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
    }
    isConnected = false;
    console.log("Disconnected from In-Memory MongoDB");
  }
}