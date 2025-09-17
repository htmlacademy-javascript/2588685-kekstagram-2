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

export { EFFECTS };
