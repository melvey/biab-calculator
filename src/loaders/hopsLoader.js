export default () => fetch('/api/hops')
	.then((response) => response.json());
