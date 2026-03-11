import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const todos = sqliteTable('todos', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	completed: integer('completed').notNull().default(0),
	createAt: integer('createAt', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
});
export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
