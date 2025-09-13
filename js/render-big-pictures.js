import { photos } from './generate-photos.js';

const bigPictureContainer = document.querySelector('.big-picture'); //Контейнер с окном
const socialCommentsContainer = bigPictureContainer.querySelector('.social__comments'); //Контейнер с комментариями
const socialCommentTemplate = bigPictureContainer.querySelector('.social__comment'); //Шаблон с комментариями
const socialCommentCount = bigPictureContainer.querySelector('.social__comment-count'); //Блок счётчика
const commentsLoader = bigPictureContainer.querySelector('.comments-loader'); //Блок для загрузки комментариев
const commentShownCountText = bigPictureContainer.querySelector('.social__comment-shown-count').textContent; //Количество показанных комментариев
const bigPictureCancel = bigPictureContainer.querySelector('.big-picture__cancel');

const onBigPictureCancelClick = () => {
  closeBigPicture();
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeBigPicture();
  }
};

const closeBigPicture = () => {

  bigPictureContainer.classList.add('hidden');

  document.body.classList.remove('modal-open');

  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
};

function openBigPicture(pictureId) {

  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));

  bigPictureContainer.querySelector('.big-picture__img img').src = currentPhoto.url;
  bigPictureContainer.querySelector('.likes-count').textContent = currentPhoto.likes;
  bigPictureContainer.querySelector('.social__comment-total-count').textContent = currentPhoto.comments.length;

  socialCommentsContainer.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();

  currentPhoto.comments.forEach(({ avatar, message, name }) => {
    const comment = socialCommentTemplate.cloneNode(true);
    const commentAvatar = comment.querySelector('.social__picture');

    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    comment.querySelector('.social__text').textContent = message;

    commentsFragment.append(comment);
  });

  socialCommentsContainer.append(commentsFragment);
  bigPictureContainer.querySelector('.social__caption').textContent = currentPhoto.description;

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.body.classList.add('modal-open');
  bigPictureContainer.classList.remove('hidden');

  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onEscKeydown);
};


export { openBigPicture };
/*
При закрытии окна (нажатии на клавиши esc или по иконке закрытия):
у bigPictureContainer добавляется класс hidden
у body убирается класс modal-open
*/
/*
После открытия окна:
добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
Подключите модуль в проект.*/
