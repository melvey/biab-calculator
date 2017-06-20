
export default () => fetch('/api/yeast')
	.then((response) => response.json());
