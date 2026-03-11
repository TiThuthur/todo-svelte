import { db } from './index';
import { todos, type Todo, type NewTodo } from './schema';
import { eq } from 'drizzle-orm';

export const getTodos = async (): Promise<Todo[]> => {
	try {
		return await db.select().from(todos);
	} catch (error) {
		console.error("Message d'erreur de récupération: ", error);
		throw error;
	}
};

export const createTodo = async (title: string): Promise<Todo> => {
	try {
		return await db.insert(todos).values({ title }).returning()[0];
	} catch (error) {
		console.error("Message d'erreur de création: ", error);
		throw error;
	}
};

export const updateTodo = async (
	id: number,
	updates: Partial<Omit<Todo, 'id' | 'createdAt'>>
): Promise<Todo> => {
	try {
		const setData: any = {};
		if (updates.title !== undefined) setData.title = updates.title;
		if (updates.completed !== undefined) setData.completed = updates.completed ? 1 : 0;
		return await db.update(todos).set(setData).where(eq(todos.id, id)).returning()[0];
	} catch (error) {
		console.error("Message d'erreur de mise à jour: ", error);
		throw error;
	}
};
export const deleteTodo = async (id: number): Promise<Todo> => {
	try {
		return await db.delete(todos).where(eq(todos.id, id)).returning()[0];
	} catch (error) {
		console.error("Message d'erreur de suppression: ", error);
		throw error;
	}
};
