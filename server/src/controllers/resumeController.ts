import prisma from "../config/db";
import jwt from "jsonwebtoken";

interface Resume {
  title: string;
  experience: string[];
  education: string[];
  certificates: string[];
  contact: string[];
  project: string[];
  github: string;
  linkedin: string;
}

export const createResume = async (
  req: { header: (arg0: string) => string; body: Resume },
  res: any
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, token missing",
      });
    }

    const decodedUserId = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };

    if (!decodedUserId) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const resumeId = decodedUserId.userId;

    const {
      title,
      experience,
      education,
      certificates,
      contact,
      project,
      github,
      linkedin,
    }: Resume = req.body;

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
        authorId: resumeId,
      },
    });

    res.status(201).json({ success: true, data: newResume });
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
