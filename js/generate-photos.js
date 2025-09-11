import { getRandomInteger, createRandomIdFromRangeGenerator } from './utils.js';
import { PHOTO_DESCRIPTIONS, MESSAGES, NAMES } from './data.js';

const NUM_PHOTO = 25;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MIN_COMMENT = 0;
const MAX_COMMENT = 30;

const MIN_ID_USER = 1;
const MAX_ID_USER = 1000;

const MIN_ID_AVATAR = 1;
const MAX_ID_AVATAR = 6;

//Создание комментариев
//Функция для генерации id комментаторов
const generateUniqueId = createRandomIdFromRangeGenerator(MIN_ID_USER, MAX_ID_USER);

//Создание аватара
function createRandomAvatar() {
  return `img/avatar-${getRandomInteger(MIN_ID_AVATAR, MAX_ID_AVATAR)}.svg`;
}

//Создание комментариев
function createComment() {
  return {
    id: generateUniqueId(),
    avatar: createRandomAvatar(),
    message: NAMES[getRandomInteger(0, NAMES.length - 1)],
    name: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]
  };
}

//Создание массива комментариев для фото
function createCommentsForPhoto() {
  const commentsCount = getRandomInteger(MIN_COMMENT, MAX_COMMENT);

  return Array.from({ length: commentsCount }, () => createComment());
}

//Создание объектов фотографий
function createPhoto(id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: PHOTO_DESCRIPTIONS[getRandomInteger(0, PHOTO_DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: createCommentsForPhoto()
  };
}

//Создаем массив с генерированными фотографиями
function generatePhotosArray() {
  let id = 1;
  return Array.from({ length: NUM_PHOTO }, () => createPhoto(id++));
}

const photos = generatePhotosArray();
export { photos };
