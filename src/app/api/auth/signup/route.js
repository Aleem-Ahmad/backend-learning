import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/serverDb";

export async function POST(request) {
  try {
    const { email, password, role } = await request.json();
    const db = readDb();

    // Check if user exists
    if (db.users.find(u => u.email === email)) {
      return NextResponse.json({ error: "User already exists on server!" }, { status: 400 });
    }

    const newUser = { id: Date.now(), email, password, role };
    db.users.push(newUser);
    writeDb(db);

    return NextResponse.json({ message: "User registered on backend!", user: { email, role } });
  } catch (error) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
