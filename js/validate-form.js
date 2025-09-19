import { validateHashtags, getHashtagErrorMessage } from './check-hashtag-validity.js';

const MAX_COMMENT_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const commentInput = imgUploadForm.querySelector('.text__description');
const hashtagInput = imgUploadForm.querySelector('.text__hashtags');

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

pristine.addValidator(hashtagInput, validateHashtags, getHashtagErrorMessage);
pristine.addValidator(commentInput, validateCommentLength, `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов`);

export { pristine, imgUploadForm, hashtagInput, commentInput };
