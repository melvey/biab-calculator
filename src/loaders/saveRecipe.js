
export default (recipe) => fetch(
	'/api/recipe',
	{
		method: 'PUT',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify(recipe),
		credentials: 'same-origin'
	}
)
	.then((response) => response.json());
