import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB CONNECTED: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Lopettaa prosessin, jos yhteys epäonnistuu 1 tarkoittaa epäonnistunutta 0 onnitunutta
    }
};
export default connectDB; 