//Функция 1. Проверка длины строки

function validateStringLength(string = '', length = 1) {
  return string.length <= length;
}

window.console.log(validateStringLength('проверяемая строка', 20));
window.console.log(validateStringLength('проверяемая строка', 18));
window.console.log(validateStringLength('проверяемая строка', 10));


//Функция 2. Проверка палидрома

function isPalidrome (string = '') {
  string = string.toString().replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string.at(i);
  }
  return string === reversedString;
}

window.console.log(isPalidrome('топот'));
window.console.log(isPalidrome('ДовОд'));
window.console.log(isPalidrome('Кекс'));
window.console.log(isPalidrome('Лёша на полке клопа нашёл '));


//Функция 3. Выбор чисел из строки

function extractNumbers(input) {
  input = input.toString();
  let result = '';

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char >= '0' && char <= '9') {
      result += char;
    }
  }

  return parseInt(result, 10);
}

window.console.log(extractNumbers('2023 год'));
window.console.log(extractNumbers('ECMAScript 2022'));
window.console.log(extractNumbers('1 кефир, 0.5 батона'));
window.console.log(extractNumbers('агент 007'));
window.console.log(extractNumbers('а я томат'));
window.console.log(extractNumbers(2023));
window.console.log(extractNumbers(-1));
window.console.log(extractNumbers(1.5));
