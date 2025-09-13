const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPictureContainer = document.querySelector('.big-picture'); //Контейнер с окном
const socialCommentsContainer = bigPictureContainer.querySelector('.social__comments'); //Контейнер с комм
const socialCommentTemplate = bigPictureContainer.querySelector('.social__comment'); //Шаблон с комм
const commentsLoader = bigPictureContainer.querySelector('.comments-loader'); //Блок для загрузки комм
const commentShownCountText = bigPictureContainer.querySelector('.social__comment-shown-count'); //Количество показанных комм
const commentsTotalCountText = bigPictureContainer.querySelector('.social__comment-total-count'); //Количество всех комм
socialCommentsContainer.innerHTML = '';

const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach(({ avatar, message, name }) => {
    const comment = socialCommentTemplate.cloneNode(true);
    const commentAvatar = comment.querySelector('.social__picture');

    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    comment.querySelector('.social__text').textContent = message;

    commentsFragment.append(comment);
  });

  socialCommentsContainer.append(commentsFragment);
  commentShownCountText.textContent = renderedCommentsLength;
  commentsTotalCountText.textContent = comments.length;

  if (renderedCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');
  }

  currentCount += COUNT_STEP;
};

const clearComments = () => {
  currentCount = 0;
  socialCommentsContainer.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', renderNextComments)
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();

  commentsLoader.addEventListener('click', renderNextComments);
};

export { clearComments, renderComments };
