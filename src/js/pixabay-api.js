import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
  const keyApi = '54610826-258ca21fce67e24d1b909df87';
  const response = await axios.get(`https://pixabay.com/api/`, {
    params: {
      key: keyApi,
      per_page: 15,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
    },
  });

  return response.data;
}
