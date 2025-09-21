const templateForThumbnails = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const renderPictures = (pictures) => {
  const thumbnailsFragment = document.createDocumentFragment();

  pictures.forEach(({ id, url, description, likes, comments }) => {
    const thumbnail = templateForThumbnails.cloneNode(true);
    const thumbnailImage = thumbnail.querySelector('.picture__img');

    thumbnail.dataset.id = id;
    thumbnailImage.src = url;
    thumbnailImage.alt = description;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;

    thumbnailsFragment.append(thumbnail);
  });

  picturesContainer.append(thumbnailsFragment);
};

export { picturesContainer, renderPictures };
