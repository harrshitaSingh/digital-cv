import express from "express";
import { createResume } from "../Controllers/resumeController";

const router = express.Router();

router.post("/yourProj", createResume);

export default router;
