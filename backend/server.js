import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/product.model.js";


dotenv.config();

const app = express();

app.use(express.json()); //Json data vastaanotetaan req.body elementissä

// Middleware, jotta saadaan JSON-data käyttöön
app.use(express.json());

app.post("/api/products", async (req, res) => {
    const product = req.body; // Käyttäjän lähettämä data kun tuote luodaan

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Täytä kaikki kentät" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct, message: "Tuote luotu onnistuneesti" });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ success: false, message: "Virhe tietojen tallentamisessa" });
    }
});

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log("Server is running on at http://localhost:5000");
});
