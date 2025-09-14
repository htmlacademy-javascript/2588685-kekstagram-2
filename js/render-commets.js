const COUNT_STEP = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const socialCommentsContainer = bigPictureContainer.querySelector('.social__comments');
const socialCommentTemplate = bigPictureContainer.querySelector('.social__comment');
const commentsLoader = bigPictureContainer.querySelector('.comments-loader');
const commentShownCountText = bigPictureContainer.querySelector('.social__comment-shown-count');
const commentsTotalCountText = bigPictureContainer.querySelector('.social__comment-total-count');

let currentCount = 0;
let comments = [];

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

  commentsLoader.classList.toggle('hidden',renderedCommentsLength >= comments.length);

  currentCount += COUNT_STEP;
};

function onCommentsLoaderClick() {
  renderNextComments();
}

const clearComments = () => {
  currentCount = 0;
  socialCommentsContainer.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();
  commentsTotalCountText.textContent = comments.length;

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

export { clearComments, renderComments };
