import { isEscapeKey } from './utils.js';
import { validateHashtags, getHashtagErrorMessage } from './check-hashtag-validity.js';
import { resetEdition } from './edit-picture.js';

const MAX_COMMENT_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');

const onDocumentEscPress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      imgUploadForm.reset();
      closeImgUpload();
    }
  }
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

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

pristine.addValidator(hashtagInput, validateHashtags, getHashtagErrorMessage);

pristine.addValidator(commentInput, validateCommentLength, `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов`);

imgUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
