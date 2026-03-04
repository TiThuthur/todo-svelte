<script>
	import { onMount } from 'svelte';

	let todos = $state([]);
	let newTodo = $state('');

	onMount(async () => {
		const res = await fetch('/api/todos');
		if (res.ok) todos = await res.json();
	});

	const addTodo = async () => {
		if (!newTodo.trim()) return;
		const res = await fetch('/api/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text: newTodo })
		});
		if (!res.ok) return;
		const created = await res.json();
		todos = [...todos, created];
		newTodo = '';
	};

	const toggleTodo = async (todo) => {
		const res = await fetch('/api/todos', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: todo.id, completed: !todo.completed })
		});
		if (!res.ok) return;
		const updated = await res.json();
		todos = todos.map((t) => (t.id === updated.id ? updated : t));
	};

	const removeTodo = async (id) => {
		const res = await fetch('/api/todos', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id })
		});
		if (!res.ok) return;
		todos = todos.filter((todo) => todo.id !== id);
	};
</script>

<section class="flex h-screen flex-col items-center justify-around p-4">
	<div class="text-center">
		<h1 class="p-4 text-4xl font-bold">My todo app</h1>
		<p class="text-2xl">Bienvenue sur ta todo app!</p>
	</div>
	<div>
		<input
			type="text"
			placeholder="Ajouter une tâche"
			bind:value={newTodo}
			class="mr-2 rounded border p-2 shadow-md"
		/>
		<button
			onclick={addTodo}
			class="rounded bg-orange-500 px-4 py-2 text-white shadow-md hover:bg-orange-600 active:scale-95 active:bg-orange-700"
		>
			Ajouter
		</button>
	</div>
	<div class="flex h-6/12 w-xl flex-col items-center rounded-lg bg-orange-100 p-4 shadow-lg">
		<div class="w-full bg-white p-4 shadow-md">
			<p>Voici la liste de tes tâches :</p>
			<ul>
				{#each todos as todo (todo.id)}
					<li class="flex w-full items-center justify-around p-1">
						<span>
							<input
								type="checkbox"
								id="completed-{todo.id}"
								checked={todo.completed}
								onchange={() => toggleTodo(todo)}
								class="p-1"
							/>
							{todo.text}
						</span>
						<button
							onclick={() => removeTodo(todo.id)}
							class="rounded bg-red-500 px-4 py-2 text-white shadow-md hover:bg-red-600 active:scale-95 active:bg-red-700"
						>
							Supprimer
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
