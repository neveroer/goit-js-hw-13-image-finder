const key = '19458031-d9248aeea24cd8260c83c18d5'
const baseUrl = 'https://pixabay.com/api/'

const DEFAULT_PER_PAGE = 12;

function searchImage(q, page, perPage) {
	if (!page)
		page = 1;
	if (!perPage)
		perPage = DEFAULT_PER_PAGE;

	let url = `${baseUrl}?key=${key}&q=${q}&page=${page}&per_page=${perPage}`
	return fetch(url, {
		headers: {
			Accept: 'application/json',
		},
		}).then(response => {
		if (response.ok || response.status === 404) 
			return response.json();
		throw new Error('Error fetching data');
	})
}


export default { searchImage }