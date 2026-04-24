import { NextResponse } from "next/server";
import { readDb } from "@/lib/serverDb";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const db = readDb();

    const user = db.users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials on backend" }, { status: 401 });
    }

    // In a real app, we would return a JWT token here.
    // For this learning project, we return the user data.
    return NextResponse.json({ 
      message: "Login successful!", 
      user: { email: user.email, role: user.role } 
    });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
