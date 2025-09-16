import { EFFECTS } from './data.js';

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
let currentEffectHandler = null;

const resizeImgPreview = (scale) => {
  imgPreview.style.transform = `scale(${scale})`;
  scaleInput.value = `${scale * 100}%`;
};

const resetEdition = () => {
  scaleInput.value = `${imgScale * 100}%`;

  imgScale = DEFAULT_SCALE;
  imgPreview.style.transform = `scale(${imgScale})`;

  imgPreview.style.filter = 'none';
  effectLevelContainer.classList.add('hidden');
};

scaleButtonSmaller.addEventListener('click', () => {
  if (imgScale > MIN_SCALE) {
    imgScale -= SCALE_STEP;
    resizeImgPreview(imgScale);
  }
});

scaleButtonBigger.addEventListener('click', () => {
  if (imgScale < MAX_SCALE) {
    imgScale += SCALE_STEP;
    resizeImgPreview(imgScale);
  }
});

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

const applyEffect = (effectName) => {
  const effect = EFFECTS[effectName];

  if (!effect || effectName === 'none') {
    imgPreview.style.filter = 'none';
    effectLevelContainer.classList.add('hidden');
    return;
  }

  effectSlider.noUiSlider.updateOptions({
    range: effect.range,
    start: effect.start,
    step: effect.step,
  });

  effectLevelContainer.classList.remove('hidden');

  effectSlider.noUiSlider.off('update');

  currentEffectHandler = () => {
    const value = effectSlider.noUiSlider.get();
    effectLevelValue.value = value;
    imgPreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
  };

  effectSlider.noUiSlider.on('update', currentEffectHandler);

  imgPreview.style.filter = `${effect.filter}(${effect.start}${effect.unit})`;
  effectLevelValue.value = effect.start;
};

const onEffectChange = (evt) => {
  const effectName = evt.target.value;
  applyEffect(effectName);
};

effectRadio.forEach((radioButton) => {
  radioButton.addEventListener('change', onEffectChange);
});

export { resetEdition };

/*
С помощью библиотеки noUiSlider (скрипт и стили находятся в директории /vendor/nouislider) реализуйте
применение эффекта для изображения. Кроме визуального применения эффекта необходимо
записывать значение в скрытое поле для дальнейшей отправки на сервер.

Наложение эффекта на изображение:

По умолчанию должен быть выбран эффект «Оригинал».
На изображение может накладываться только один эффект.
Интенсивность эффекта регулируется перемещением ползунка в слайдере.
Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider.
Уровень эффекта записывается в поле .effect-level__value в виде числа.
При изменении уровня интенсивности эффекта (предоставляется API слайдера),
CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:

Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
Для эффекта «Оригинал» CSS-стили filter удаляются.

При выборе эффекта «Оригинал» слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
слайдер, CSS-стиль изображения и значение поля должны обновляться.

Обратите внимание, что при переключении фильтра, уровень эффекта должен сразу сбрасываться до начального состояния,
т. е. логика по определению уровня насыщенности должна срабатывать не только при «перемещении» слайдера,
но и при переключении фильтров.
*/
