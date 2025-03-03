import prisma from "../Config/db";
import jwt from "jsonwebtoken";
import { signUpModel } from "../Models/signUp.model";
import { loginModel } from "../Models/logIn.model";
import { Request, Response } from "express";

export const signUp = async (req: Request<{}, {}, signUpModel>, res: Response) => {
  const { name, email, password } = req.body;

 if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }


    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password
      },
    });

    const token = jwt.sign(
      { userId: newUser.id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const login = async (
req: Request<{}, {}, loginModel>, res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
