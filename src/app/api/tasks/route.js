import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/serverDb";

/**
 * TASKS API ROUTE
 * 
 * GET: Fetches all tasks from the JSON database.
 * POST: Saves a new task to the JSON database.
 */

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.tasks);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const db = readDb();
    
    const newTask = {
      ...body,
      id: Date.now(),
    };

    db.tasks.push(newTask);
    writeDb(db);

    return NextResponse.json({ message: "Successfully saved to server!", task: newTask });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save task" }, { status: 500 });
  }
}

/**
 * DELETE: Deleting requires an ID, usually passed as a query param or a dynamic route.
 * For simplicity in this learning app, we'll use a query param: /api/tasks?id=123
 */
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const db = readDb();
  db.tasks = db.tasks.filter(t => t.id !== parseInt(id));
  writeDb(db);

  return NextResponse.json({ message: "Task deleted from server" });
}
