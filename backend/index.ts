import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import algorandRoutes from "./routes/algorandRoutes.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDb connected");

    app.use("/api/algorand", algorandRoutes);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDb disconnected", err));


app.get("/", (_, res) => res.send("Algorand MERN API Running"));
app.use("/api/algorand", algorandRoutes);

console.log("ALGOD_SERVER:", process.env.ALGOD_SERVER);
console.log("ALGOD_PORT:", process.env.ALGOD_PORT);
console.log("ALGOD_TOKEN:", process.env.ALGOD_TOKEN);

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
