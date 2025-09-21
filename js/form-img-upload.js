import { imgPreview } from './edit-picture.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileInput = document.querySelector('.img-upload__input');
const effectPreviews = document.querySelectorAll('.effects__preview');

const defaultImage = 'img/upload-default-image.jpg';

const onFileInputChange = () => {
  const file = fileInput.files[0];

  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const imgUrl = URL.createObjectURL(file);
    imgPreview.src = imgUrl;
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${imgUrl})`;
    });
  }
};

const resetPreview = () => {
  URL.revokeObjectURL(imgPreview.src);
  imgPreview.src = defaultImage;
  fileInput.value = '';
};

fileInput.addEventListener('change', onFileInputChange);

export { resetPreview };
