import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db/index.js';
import { todo } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
export const GET = () => {
	const todos = db.select().from(todo).all();
	return json(todos);
};

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }) => {
	const { text } = await request.json();
	if (!text || typeof text !== 'string' || !text.trim()) {
		error(400, 'text is required');
	}
	const newTodo = db.insert(todo).values({ text: text.trim(), completed: false }).returning().get();
	return json(newTodo, { status: 201 });
};

/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request }) => {
	const { id, completed } = await request.json();
	if (!Number.isInteger(id) || typeof completed !== 'boolean') {
		error(400, 'id (integer) and completed (boolean) are required');
	}
	const updated = db.update(todo).set({ completed }).where(eq(todo.id, id)).returning().get();
	if (!updated) error(404, 'todo not found');
	return json(updated);
};

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ request }) => {
	const { id } = await request.json();
	if (!Number.isInteger(id)) {
		error(400, 'id (integer) is required');
	}
	db.delete(todo).where(eq(todo.id, id)).run();
	return json({ success: true });
};
