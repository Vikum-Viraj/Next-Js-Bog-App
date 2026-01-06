import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        // Check if already connected
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        // Check if MONGO_URL exists
        const mongoUrl = process.env.MONGO_URL || process.env.MONGO_URI;
        
        if (!mongoUrl) {
            throw new Error("MONGO_URL or MONGO_URI environment variable is not set");
        }

        await mongoose.connect(mongoUrl);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        throw error; // Re-throw to let caller handle it
    }
}

export default connectToDatabase;