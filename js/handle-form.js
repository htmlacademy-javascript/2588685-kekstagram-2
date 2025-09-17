import { resetEdition } from './edit-picture.js';
import { sendData } from './api.js';
import { isEscapeKey } from './utils.js';
import { pristine, imgUploadForm, hashtagInput, commentInput } from './validate-form.js';

const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const submitButton = imgUploadForm.querySelector('#upload-submit');

const showMessage = (templateId, closeButtonSelector) => {
  const template = document.querySelector(templateId).content.querySelector(templateId.slice(1));
  const message = template.cloneNode(true);
  const closeButton = message.querySelector(closeButtonSelector);

  const removeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', onEscPress);
  };

  function onEscPress(evt) {
    if (isEscapeKey(evt)) {
      removeMessage();
    }
  };

  const onClickOutside = (evt) => {
    if (!evt.target.closest(templateId.slice(1))) {
      removeMessage();
    }
  };

  const onCloseButtonClick = () => {
    removeMessage();
  };

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onClickOutside);

  document.body.append(message);
};

const showSuccessMessage = () => showMessage('#success', '.success__button');
const showErrorMessage = () => showMessage('#error', '.error__button');

const onDocumentEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
      return;
    }
    evt.preventDefault();
    imgUploadForm.reset();
    closeImgUpload();
  }
};

function onImgUploadCancelClick() {
  closeImgUpload();
}

function closeImgUpload() {
  imgUploadCancel.removeEventListener('click', onImgUploadCancelClick);
  document.removeEventListener('keydown', onDocumentEscPress);

  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadInput.value = '';
  resetEdition();
  pristine.reset();
}

function onImgUploadChange() {
  imgUploadCancel.addEventListener('click', onImgUploadCancelClick);
  document.addEventListener('keydown', onDocumentEscPress);

  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

imgUploadInput.addEventListener('change', onImgUploadChange);

const toggleSubmitButton = (state) => {
  submitButton.disabled = state;
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) return;

  toggleSubmitButton(true);
  const formData = new FormData(evt.target);
  sendData(formData)
    .then(() => {
      closeImgUpload();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      toggleSubmitButton(false);
    });
});
