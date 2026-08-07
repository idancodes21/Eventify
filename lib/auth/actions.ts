"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations/auth";

export async function registerUser(data: unknown) {
  const result = signupSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid form data",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const {
    firstName,
    lastName,
    username,
    email,
    password,
  } = result.data;

  const normalizedEmail = email.toLowerCase();
  const normalizedUsername = username.toLowerCase();

  // Check whether email or username already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: normalizedEmail },
        { username: normalizedUsername },
      ],
    },
    select: {
      email: true,
      username: true,
    },
  });

  if (existingUser) {
    if (existingUser.email === normalizedEmail) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    return {
      success: false,
      error: "This username is already taken.",
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  await prisma.user.create({
    data: {
      firstName,
      lastName,
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
    },
  });

  return {
    success: true,
  };
}