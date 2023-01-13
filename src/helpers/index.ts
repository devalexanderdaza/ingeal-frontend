export const makeRequest = async (url: string, options: RequestInit) => {
	const backendUrl = 'http://localhost:3000';
	const response = await fetch(`${backendUrl}/${url}`, options);
	const data = await response.json();
	return data.data;
};
