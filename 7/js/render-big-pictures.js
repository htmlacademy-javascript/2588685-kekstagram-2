import { photos } from './generate-photos.js';
import { clearComments, renderComments } from './render-commets.js';

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureCancel = bigPictureContainer.querySelector('.big-picture__cancel');

const onBigPictureCancelClick = () => {
  closeBigPicture();
};

const onDocumentEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeBigPicture();
  }
};

function closeBigPicture() {
  clearComments();

  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

function openBigPicture(pictureId) {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));

  bigPictureContainer.querySelector('.big-picture__img img').src = currentPhoto.url;
  bigPictureContainer.querySelector('.likes-count').textContent = currentPhoto.likes;
  bigPictureContainer.querySelector('.social__caption').textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
}

export { openBigPicture };
