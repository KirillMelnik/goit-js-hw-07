// import basicLightbox from '.basiclightbox.js';
import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainerRef = document.querySelector('.gallery');

const galleryMarkup = onRanderGalleryMarkup(galleryItems);
galleryContainerRef.insertAdjacentHTML('beforeend', galleryMarkup);

function onRanderGalleryMarkup(elems) {
  return elems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>
      `;
    })
    .join(' ');
}

galleryContainerRef.addEventListener('click', onShowImg);

const instance = basicLightbox.create('<img src =""/>', {
  onShow: () => {
    window.addEventListener('keydown', onCloseModal);
  },

  onClose: () => {
    window.removeEventListener('keydown', onCloseModal);
  },
});

function onShowImg(event) {
  event.preventDefault();
  instance.element().querySelector('img').src = event.target.dataset.source;
  instance.show();
}

function onCloseModal(event) {
  console.log(event);
  if (event.key === 'Escape') {
    return instance.close();
  }
}
