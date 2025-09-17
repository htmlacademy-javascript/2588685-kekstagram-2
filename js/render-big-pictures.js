import { clearComments, renderComments } from './render-comments.js';
import { isEscapeKey } from './utils.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCancel = bigPictureContainer.querySelector('.big-picture__cancel');

let photosData = [];

const onBigPictureCancelClick = () => {
  closeBigPicture();
};

const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const setPhotos = (photos) => {
  photosData = photos;
};

function closeBigPicture() {
  clearComments();

  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

function openBigPicture(pictureId) {
  const currentPhoto = photosData.find((photo) => photo.id === Number(pictureId));
  if (!currentPhoto) {
    return;
  }

  bigPictureContainer.querySelector('.big-picture__img img').src = currentPhoto.url;
  bigPictureContainer.querySelector('.likes-count').textContent = currentPhoto.likes;
  bigPictureContainer.querySelector('.social__caption').textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
}

export { openBigPicture, setPhotos };
