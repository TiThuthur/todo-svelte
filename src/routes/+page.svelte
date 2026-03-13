<script>
	let todos = $state([
		{
			id: 1,
			text: 'Apprendre Svelte',
			completed: false
		}
	]);
	let newTodo = $state('');
	const addTodo = () => {
		const todo = {
			id: todos.length + 1,
			text: newTodo,
			completed: false
		};
		todos = [...todos, todo];
		newTodo = '';
	};
	const removeTodo = (id) => {
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
						<span>{todo.id + 1}</span>
						<span>
							<input type="checkbox" id="completed" bind:checked={todo.completed} class="p-1" />
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
