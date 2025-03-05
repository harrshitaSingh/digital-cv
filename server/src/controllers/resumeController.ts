  import { Request, Response } from "express";
  import jwt from "jsonwebtoken";
  import prisma from "../Config/db";
  import { ResumeModel } from "../Models/resume.model";

 export const createResume = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };
    console.log("Decoded Token:", decoded); // Debugging line to check if id exists

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const authorId = decoded.id;

    const {
      title,
      experience,
      education,
      certificates,
      contact,
      project,
      github,
      linkedin,
    }: ResumeModel = req.body;

    if (!title || !experience || !education || !contact || !project) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newResume = await prisma.resume.create({
      data: {
        title,
        experience,
        education,
        certificates,
        contact,
        project,
        github,
        linkedin,
        authorId,
      },
    });

    res.status(201).json({ success: true, data: newResume });
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getResumes = async (req: Request, res: Response) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };
        if (!decoded || !decoded.id) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        const authorId = decoded.id; 
        const resumes = await prisma.resume.findMany({ where: { authorId } });

        res.json(resumes);
    } catch (error) {
        console.error("Error fetching resumes:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

