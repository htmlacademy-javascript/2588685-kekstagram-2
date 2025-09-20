import { resetEdition } from './edit-picture.js';
import { sendData } from './api.js';
import { pristine, imgUploadForm, hashtagInput, commentInput } from './validate-form.js';
import { isEscapeKey } from './utils.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const submitButton = imgUploadForm.querySelector('#upload-submit');

let isMessageOpen = false;

const showMessage = (templateId, closeButtonSelector) => {
  const template = document.querySelector(templateId).content.querySelector(`.${templateId.slice(1)}`);
  const message = template.cloneNode(true);
  const closeButton = message.querySelector(closeButtonSelector);

  const onDocumentClick = (evt) => {
    if (evt.target === message) {
      removeMessage();
    }
  };

  function removeMessage() {
    isMessageOpen = false;

    message.remove();
    document.removeEventListener('keydown', onDocumentEscKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  function onDocumentEscKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
      removeMessage();
    }
  }

  const onCloseButtonClick = () => {
    removeMessage();
  };

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(message);
  isMessageOpen = true;
};

const showSuccessMessage = () => showMessage('#success', '.success__button');
const showErrorMessage = () => showMessage('#error', '.error__button');

const onDocumentEscPress = (evt) => {
  if (isMessageOpen) {
    return;
  }

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

const onImgUploadCancelClick = () => {
  closeImgUpload();
};

const onImgUploadChange = () => {
  imgUploadCancel.addEventListener('click', onImgUploadCancelClick);
  document.addEventListener('keydown', onDocumentEscPress);

  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function closeImgUpload() {
  imgUploadCancel.removeEventListener('click', onImgUploadCancelClick);
  document.removeEventListener('keydown', onDocumentEscPress);

  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  imgUploadInput.value = '';
  resetEdition();
  pristine.reset();
}

imgUploadInput.addEventListener('change', onImgUploadChange);

const toggleSubmitButton = (isSending) => {
  submitButton.disabled = isSending;
  submitButton.textContent = isSending ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

imgUploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    toggleSubmitButton(true);

    const formData = new FormData(evt.target);

    try {
      await sendData(formData);
      closeImgUpload();
      showSuccessMessage();
    } catch (error) {
      window.console.error('Ошибка при отправке данных', error.message);
      showErrorMessage();
    } finally {
      toggleSubmitButton(false);
    }
  }
});

export { showSuccessMessage };
