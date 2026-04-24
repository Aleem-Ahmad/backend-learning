import fs from 'fs';
import path from 'path';

/**
 * SERVER-SIDE DATABASE HELPER
 * 
 * This file is only intended to be used within API Routes (src/app/api/...).
 * It reads and writes to a local JSON file to simulate a real database.
 */

const DB_PATH = path.join(process.cwd(), 'src/lib/db.json');

// Helper to read the database
export const readDb = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading DB:", error);
    return { tasks: [], users: [] };
  }
};

// Helper to write to the database
export const writeDb = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to DB:", error);
  }
};
