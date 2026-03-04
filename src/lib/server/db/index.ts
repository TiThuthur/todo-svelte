import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('db.sqlite');
const db = drizzle({ client: sqlite });

const result = db.execute('SELECT name FROM sqlite_master WHERE type="table"');
