const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const MESSAGE_DELAY = 5000;

const showDataError = () => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = errorTemplate.cloneNode(true);

  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, MESSAGE_DELAY);
};

const load = async (route, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, { method, body });

    if (!response.ok) {
      throw new Error(errorText);
    }
    return await response.json();
  } catch (err) {
    throw new Error(errorText);
  }
};

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData, showDataError };
