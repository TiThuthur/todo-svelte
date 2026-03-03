<script>
	let todos = $state([]);
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

<section class="flex h-screen items-center justify-center p-4">
	<div class="flex h-6/12 w-xl flex-col items-center rounded-lg bg-cyan-100 p-4 shadow-lg">
		<h1>My todo app</h1>
		<p>Bienvenue sur ta todo app!</p>
		<div class="">
			<p>Voici la liste de tes tâches :</p>
			<ul>
				{#each todos as todo}
					<li>
						{todo.text} <button onclick={() => removeTodo(todo.id)}>Supprimer</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
