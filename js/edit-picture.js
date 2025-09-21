const EFFECTS = {
  none: {
    filter: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    unit: '',
  },
};

const SCALE_STEP = 0.25;
const MAX_SCALE = 1;
const MIN_SCALE = 0.25;
const DEFAULT_SCALE = 1;

const scaleButtonSmaller = document.querySelector('.scale__control--smaller');
const scaleButtonBigger = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = effectLevelContainer.querySelector('.effect-level__slider');
const effectLevelValue = effectLevelContainer.querySelector('.effect-level__value');
const effectRadio = document.querySelectorAll('.effects__radio');

let imgScale = DEFAULT_SCALE;
let effect = EFFECTS['none'];

const currentEffectHandler = () => {
  const value = effectSlider.noUiSlider.get();
  effectLevelValue.value = value;
  imgPreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
};

const resetEdition = () => {
  scaleInput.value = `${imgScale * 100}%`;

  imgScale = DEFAULT_SCALE;
  imgPreview.style.transform = `scale(${imgScale})`;

  imgPreview.style.filter = 'none';
  effectLevelContainer.classList.add('hidden');
};

const resizeImgPreview = (scale) => {
  imgPreview.style.transform = `scale(${scale})`;
  scaleInput.value = `${scale * 100}%`;
};

const changeScale = (delta) => {
  const newScale = imgScale + delta * SCALE_STEP;

  if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
    imgScale = newScale;
    resizeImgPreview(imgScale);
  }
};

scaleButtonSmaller.addEventListener('click', () => changeScale(-1));

scaleButtonBigger.addEventListener('click', () => changeScale(1));

effectLevelContainer.classList.add('hidden');

noUiSlider.create(effectSlider, {
  start: 0,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 1,
  },
  format: {
    to: (value) => Number.isInteger(value)
      ? value.toFixed(0)
      : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

effectSlider.noUiSlider.on('update', currentEffectHandler);

const onEffectChange = (evt) => {
  effect = EFFECTS[evt.target.value];

  if (!effect || evt.target.value === 'none') {
    imgPreview.style.filter = 'none';
    effectLevelValue.value = '';
    effectLevelContainer.classList.add('hidden');
    return;
  }

  effectSlider.noUiSlider.updateOptions({
    range: effect.range,
    start: effect.start,
    step: effect.step,
  });

  effectLevelContainer.classList.remove('hidden');
  imgPreview.style.filter = `${effect.filter}(${effect.start}${effect.unit})`;
  effectLevelValue.value = effect.start;
};

effectRadio.forEach((radioButton) => {
  radioButton.addEventListener('change', onEffectChange);
});

export { resetEdition, imgPreview };
