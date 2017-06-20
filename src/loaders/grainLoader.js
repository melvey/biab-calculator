
export default () => fetch('/api/grain')
	.then((response) => response.json());
