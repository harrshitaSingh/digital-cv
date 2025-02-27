import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./src/routes/authRoutes.js";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());


app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
