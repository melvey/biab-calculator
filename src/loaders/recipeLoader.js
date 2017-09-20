
export default (recipe) => fetch(
	'/api/recipe',
	{
		method: 'PUT',
		body: JSON.stringify(recipe),
		credentials: 'same-origin'
	}
)
	.then((response) => response.json());
