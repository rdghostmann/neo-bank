import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connectToDB } from "@/lib/connectDB";
import { v4 as uuidv4 } from "uuid"; // <-- Import uuidv4

export async function POST(req) {
  try {
    await connectToDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      userID: uuidv4(), // <-- Use uuidv4 here
      username: name,
      email,
      password: hashed,
      role: "user",
    });

    return NextResponse.json({ success: true, user: { email: user.email, role: user.role } });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}