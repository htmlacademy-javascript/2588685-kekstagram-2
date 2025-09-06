function validateStringLength(string = '', length = 1) {
  return string.length <= length;
}

validateStringLength ('проверяемая строка', 10);

function isPalidrome (string = '') {
  string = string.replaceAll(' ','').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string.at(i);
  }
  return string === reversedString;
}

isPalidrome('Лёша на полке клопа нашёл ');
