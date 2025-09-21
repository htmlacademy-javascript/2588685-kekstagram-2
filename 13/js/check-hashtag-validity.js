const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

const hashtagRules = [
  {
    check: (tags) => tags.every((tag) => tag[0] === '#'),
    message: 'Хэштег должен начинаться с #',
  },

  {
    check: (tags) => tags.every((tag) => tag.indexOf('#') === 0 && tag.lastIndexOf('#') === 0),
    message: 'Хэштеги должны быть разделены пробелами',
  },

  {
    check: (tags) => tags.every((tag) => tag !== '#'),
    message: 'Хэштег не может состоять только из #',
  },

  {
    check: (tags) => tags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag)),
    message: 'Хэштег может содержать только буквы и цифры',
  },

  {
    check: (tags) => tags.every((tag) => tag.length <= MAX_SYMBOLS),
    message: `Максимальная длина хэштега — ${MAX_SYMBOLS} символов`,
  },

  {
    check: (tags) => tags.length === new Set(tags).size,
    message: 'Один и тот же хэштег нельзя использовать дважды',
  },

  {
    check: (tags) => tags.length <= MAX_HASHTAGS,
    message: `Нельзя указывать больше ${MAX_HASHTAGS} хэштегов`,
  },
];

let errorMessage = '';

const validateHashtags = (value) => {
  const hashtags = value.trim().split(/\s+/).filter((tag) => tag.length > 0).map((tag) => tag.toLowerCase());

  if (hashtags.length === 0) {
    errorMessage = '';
    return true;
  }

  for (const rule of hashtagRules) {
    if (!rule.check(hashtags)) {
      errorMessage = rule.message;
      return false;
    }
  }

  errorMessage = '';
  return true;
};

const getHashtagErrorMessage = () => errorMessage;

export { validateHashtags, getHashtagErrorMessage };
