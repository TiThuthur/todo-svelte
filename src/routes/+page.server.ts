import type { PageServerLoad, Actions } from './$types';
import { getTodos, createTodo, updateTodo, deleteTodo } from '$lib/server/db/queries';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const todos = await getTodos();
		return { todos };
	} catch (error) {
		console.error("Message d'erreur de chargement: ", error);
		throw error;
	}
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const title = formData.get('title') as string;
		if (!title) return fail(400, { error: 'Title is required' });
		try {
			await createTodo(title);
		} catch (error) {
			console.error("Message d'erreur lors de la création de la tâche: ", error);
			throw error;
		}
	},
	toggle: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		const completed = formData.get('completed') === 'true' ? true : false;
		if (isNaN(id)) return fail(400, { error: 'Invalid ID' });
		try {
			await updateTodo(id, { completed: Number(!completed) });
		} catch (error) {
			console.error("Message d'erreur lors de la mise à jour de la tâche: ", error);
			return fail(500, { error: 'Failed to update todo' });
		}
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = Number(formData.get('id'));
		if (isNaN(id)) return fail(400, { error: 'Invalid ID' });
		try {
			await deleteTodo(id);
		} catch (error) {
			console.error("Message d'erreur lors de la suppression de la tâche: ", error);
			return fail(500, { error: 'Failed to delete todo' });
		}
	}
};
