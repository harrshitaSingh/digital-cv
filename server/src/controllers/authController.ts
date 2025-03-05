// import prisma from "../Config/db";
// import jwt from "jsonwebtoken";
// import { signUpModel } from "../Models/signUp.model";
// import { loginModel } from "../Models/logIn.model";
// import { Request, Response } from "express";

// export const signUp = async (req: Request<{}, {}, signUpModel>, res: Response) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const existingUser = await prisma.user.findUnique({ where: { email } });

//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const token = jwt.sign(
//       { email, name },
//       process.env.JWT_SECRET!,
//       { expiresIn: "1h" }
//     );

//     const newUser = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password,
//         token,  // Make sure this is being passed correctly
//       },
//     });

//     return res.status(201).json({ token });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return res.status(500).json({ error: "Something went wrong, please try again." });
//   }
// };



// export const login = async (req: Request<{}, {}, loginModel>, res: Response) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       return res.status(401).json({ error: "User not found" });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ error: "Invalid password" });
//     }

//     const token = user.token;

//     return res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };


import prisma from "../Config/db";
import jwt from "jsonwebtoken";
import { signUpModel } from "../Models/signUp.model";
import { loginModel } from "../Models/logIn.model";
import { Request, Response } from "express";

/**
 * @name signUp
 * @description Registers a new user, stores the token, and returns user details with token.
 */
export const signUp = async (req: Request<{}, {}, signUpModel>, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user and explicitly fetch ID
    const newUser = await prisma.user.create({
      data: { name, email, password }
    });

    console.log("Created user:", newUser); // Debugging - Check if ID exists

    // Generate JWT token with id, name, email
    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, email: newUser.email }, // Ensure id is here
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    console.log("Generated token:", token); // Debugging - Check token

    // Update user with token
    await prisma.user.update({
      where: { id: newUser.id },
      data: { token }
    });

    return res.status(201).json({ 
      message: "User registered successfully", 
      user: { id: newUser.id, name: newUser.name, email: newUser.email, token } 
    });

  } catch (error) {
    console.error("Error during sign-up:", error);
    return res.status(500).json({ error: "Something went wrong, please try again." });
  }
};



/**
 * @name login
 * @description Logs in the user, retrieves their token, and returns user details with token.
 */
export const login = async (req: Request<{}, {}, loginModel>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate a new token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    // Update token in the database
    await prisma.user.update({
      where: { id: user.id },
      data: { token }
    });

    return res.status(200).json({ 
      message: "Login successful", 
      user: { id: user.id, name: user.name, email: user.email, token } 
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Something went wrong, please try again." });
  }
};
