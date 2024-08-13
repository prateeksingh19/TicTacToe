import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function setupDatabase() {
  const db = await open({
    filename: "./mydatabase.db",
    driver: sqlite3.Database,
  });

  try {
    const tableCheck = await db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='users';"
    );

    if (!tableCheck) {
      await db.run(`
        CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          win INTEGER DEFAULT 0,
          loss INTEGER DEFAULT 0,
          draw INTEGER DEFAULT 0
        );
      `);
      console.log('Table "users" created successfully');
    } else {
      console.log('Table "users" already exists');
    }
  } catch (error) {
    console.error("Error checking or creating table:", error);
  } finally {
    await db.close();
  }
}

setupDatabase();
