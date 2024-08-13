import { NextResponse } from "next/server";
import dbPromise from "../lib/db";

export async function GET(request: Request) {
  const db = await dbPromise;
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");
  try {
    const users = await db.all("SELECT * FROM users WHERE id = ?", [userId]);
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const db = await dbPromise;
  try {
    const existingUser = await db.get("SELECT id FROM users WHERE name = ?", [
      name,
    ]);
    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
        id: existingUser.id,
      });
    }
    const result = await db.run("INSERT INTO users (name) VALUES (?)", [name]);
    const newUserId = result.lastID;
    return NextResponse.json({ message: "User added", id: newUserId });
  } catch (error) {
    console.error("Error inserting user:", error);
    return NextResponse.error();
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");
  const { win, loss, draw } = await request.json();

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  const db = await dbPromise;

  try {
    await db.run(
      `
      UPDATE users
      SET win = COALESCE(?, win),
          loss = COALESCE(?, loss),
          draw = COALESCE(?, draw)
      WHERE id = ?`,
      [win, loss, draw, userId]
    );

    const updatedUser = await db.get("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.error();
  }
}
