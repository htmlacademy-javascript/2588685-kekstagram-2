function validateStringLength(string ='', length = 1) {
  return string.length <= length;
}

function isPalidrome (string = '') {
  string = string.replaceAll(' ','').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string.at(i);
  }
  return string === reversedString;
}
