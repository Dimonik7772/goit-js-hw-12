import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createGallery(images) {
  const createLi = images
    .map(
      ({
        webformatURL,
        comments,
        downloads,
        likes,
        largeImageURL,
        tags,
        views,
      }) =>
        `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}">
            </a>
        <ul class="description-list">
            <li class="description-item">comments ${comments}</li>
            <li class="description-item">downloads ${downloads}</li>
            <li class="description-item">likes ${likes}</li>
            <li class="description-item">views ${views}</li>
        </ul>
        </li>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', createLi);
  lightbox.refresh();
}

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function message(message) {
  iziToast.error({
    position: 'topRight',
    title: 'Error',
    message: message,
  });
}

export function showLoader() {
  refs.loader.classList.remove('hidden');
}

export function hideLoader() {
  refs.loader.classList.add('hidden');
}
export function showLoadMoreButton() {
  refs.btnLoadMore.classList.remove('hidden');
}
export function hideLoadMoreButton() {
  refs.btnLoadMore.classList.add('hidden');
}
