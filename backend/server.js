import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/product.model.js";


dotenv.config();

const app = express();

app.use(express.json()); //Json data vastaanotetaan req.body elementissä

// Middleware, jotta saadaan JSON-data käyttöön
app.use(express.json());

app.get("/api/products", async (req, res) => {
try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
} catch (error) {
    console.log("tuotteita ei löydy", error.message);
    res.status(500).json({ success: false, message: "Virhe tuotteita haettaessa" });
}

})

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

app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) { 
        return res.status(404).json({ success: false, message: "Id numeroa ei ole olemassa" });
    }

    try {
        const uptatedProduct  = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: uptatedProduct, message: "Tuote päivitetty onnistuneesti" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Virhe tuotteet päivityksessä"});
    }
});


app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Tuote poistettu onnistuneesti" });
    } catch (error) {
        console.log("virhe tuotteiden poistamisessa: " + error.message);
        res.status(404).json({ success: false, message: "Tuotetta ei löytynyt" });
    }
});

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
    connectDB();
    console.log("Server is running on at http://localhost:5000");
});
