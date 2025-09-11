//4.16 Больше деталей

const NUM_PHOTO = 25;

const PHOTO_DESCRIPTIONS = [
  'Моя любимая фотография.',
  'Хорошее воспоминание',
  'Особенный момент, который я хочу запомнить',
  'Просто прекрасный кадр',
  'Счастливый день'
];

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MIN_COMMENT = 0;
const MAX_COMMENT = 30;

const MIN_ID_USER = 1;
const MAX_ID_USER = 1000;

const MIN_ID_AVATAR = 1;
const MAX_ID_AVATAR = 6;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём', 'Оля', 'Максим', 'Ирина', 'Виктор', 'Светлана', 'Кирилл', 'Мария'
];


//Функция генерации рандомного числа из диапазона
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

//Функция для создания уникальных id из диапазона
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger (min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger (min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

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
window.console.log(photos);
