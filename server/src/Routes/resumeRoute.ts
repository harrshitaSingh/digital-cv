import express from "express";
import { createResume, getResumes } from "../Controllers/resumeController";

const router = express.Router();

router.post("/yourProj", createResume);
router.get("/yourProj", getResumes); 

export default router;
