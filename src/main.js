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
const perPage = 15;
let input = '';

refs.form.addEventListener('submit', handleSubmit);
refs.btnLoadMore.addEventListener('click', loadMore);

async function handleSubmit(event) {
  event.preventDefault();
  const newInput = event.target.elements['search-text'].value.trim();
  if (!newInput) return message('Невалидный ввод');

  if (newInput !== input) {
    page = 1;
    clearGallery();
  }
  input = newInput;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(input, page);

    if (data.hits.length === 0) {
      return message(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    message(
      `${error} Sorry, there are no images matching your search query. Please try again!`
    );
  } finally {
    hideLoader();
    event.target.reset();
  }
}

async function loadMore() {
  page++;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(input, page);
    createGallery(data.hits);

    const galleryItem = document.querySelector('.gallery-item');
    const cardHeight = galleryItem.getBoundingClientRect().height;
    console.log(cardHeight);
    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      message('Sorry this is all Gallery by your seach');
    }
  } catch (error) {
    message(
      `${error} Sorry, there are no images matching your search query. Please try again!`
    );
  } finally {
    hideLoader();
  }
}
