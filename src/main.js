import { getImagesByQuery } from './js/pixabay-api';

import { refs } from './js/refs';
import {
  createGallery,
  message,
  showLoader,
  hideLoader,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

let page = 1;
let input = '';

refs.form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const newInput = event.target.elements['search-text'].value.trim();
  showLoader();
  if (!newInput) return;
  if (newInput !== input) {
    page = 1;
    clearGallery();
  }
  input = newInput;
  if (input === '') {
    return message('Невалидный ввод');
  }
  hideLoadMoreButton();
  if (page >= 33) {
    hideLoadMoreButton();
    return;
  }
  getImagesByQuery(input, page)
    .then(data => {
      if (data.hits.length === 0) {
        return message(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      } else if (data.hits.length > 0) {
        showLoadMoreButton();
      }
      createGallery(data.hits);
    })

    .catch(error => {
      return message(
        `${error}Sorry, there are no images matching your search query. Please try again!`
      );
    })
    .finally(() => {
      hideLoader();
      event.target.reset();
    });
}
refs.btnLoadMore.addEventListener('click', async () => {
  page++;
  if (page >= 33) {
    hideLoadMoreButton();
    return;
  }
  hideLoadMoreButton();
  showLoader();
  try {
    const data = await getImagesByQuery(input, page);
    createGallery(data.hits);
  } catch (error) {
    message(
      `${error}Sorry, there are no images matching your search query. Please try again!`
    );
  } finally {
    hideLoader();
    showLoadMoreButton();
  }
});
