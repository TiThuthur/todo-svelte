import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const sqlite = new Database('data/db.sqlite'); // chemin vers le fichier de base de données
export const db = drizzle(sqlite, { schema }); // Créer l'instance Drizzle avec le schéma pour le typage
