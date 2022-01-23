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

galleryContainerRef.addEventListener('click', onSelectedImg);

function onSelectedImg(evt) {
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  evt.preventDefault();

  const selectImage = basicLightbox.create(`<img src="${evt.target.dataset.source}">`, {
    onclose: () => {
      document.removeEventListener('keydown', onCloseModal);
    },
  });
  selectImage.show();

  document.addEventListener('keydown', onCloseModal);

  function onCloseModal(evt) {
    if (evt.key === 'Escape') {
      selectImage.close();
    }
  }
}
