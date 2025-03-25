import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.js";


dotenv.config();

const app = express();

app.use(express.json()); //Json data vastaanotetaan req.body elementissä

// Middleware, jotta saadaan JSON-data käyttöön
app.use(express.json());

app.use("/api/products",productRoutes);

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log("Server is running on at http://localhost:5000");
});
