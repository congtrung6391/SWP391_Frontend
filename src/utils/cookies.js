import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import Cookies from 'universal-cookie';
// eslint-disable-next-line import/no-cycle
import { APIService } from '../services/api.service';

const COOKIE_KEY = process.env.REACT_APP_COOKIE_KEY;
const COOKIE_ACCOUNT_NAME = process.env.REACT_APP_COOKIE_ACCOUNT_NAME;

export const saveUser = (user, isRemember = false) => {
  const cookies = new Cookies();

  const encodeUser = AES.encrypt(JSON.stringify(user), COOKIE_KEY);

  if (isRemember) {
    localStorage.setItem(COOKIE_ACCOUNT_NAME, encodeUser.toString());
  } else if (!localStorage.getItem(COOKIE_ACCOUNT_NAME)) {
    const time = new Date();
    time.setDate(time.getDate() + 7);
    cookies.set(COOKIE_ACCOUNT_NAME, encodeUser.toString(), {
      expires: time,
      path: '/',
      sameSite: true,
    });
  } else {
    localStorage.setItem(COOKIE_ACCOUNT_NAME, encodeUser.toString());
  }
};

export const isLoggedIn = () => {
  try {
    const cookies = new Cookies();
    if (localStorage.getItem(COOKIE_ACCOUNT_NAME) || cookies.get(COOKIE_ACCOUNT_NAME)) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};

export const getUserInformation = (option = 'all') => {
  if (!isLoggedIn()) {
    return null;
  }

  let getEncryptData;
  if (localStorage.getItem(COOKIE_ACCOUNT_NAME)) {
    getEncryptData = localStorage.getItem(COOKIE_ACCOUNT_NAME);
  } else {
    const cookies = new Cookies();
    getEncryptData = cookies.get(COOKIE_ACCOUNT_NAME);
  }

  try {
    const decrypt = AES.decrypt(getEncryptData, COOKIE_KEY);
    const decryptToInfo = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));

    if (option === 'all') {
      return decryptToInfo;
    }
    console.log(decryptToInfo);
    return decryptToInfo[option];
  } catch (error) {
    return null;
  }
};

const clearSavedData = () => {
  document.cookie = `${COOKIE_ACCOUNT_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `${COOKIE_ACCOUNT_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/user;`;
  localStorage.removeItem(COOKIE_ACCOUNT_NAME);
};

export const logOut = () => {
  if (!localStorage.getItem('isLoggingOut')) {
    localStorage.setItem('isLoggingOut', true);
    clearSavedData();
    localStorage.removeItem('isLoggingOut');
  }
};

export const fetchAuthToken = async () => {
  if (!isLoggedIn()) {
    return false;
  }

  const Username = getUserInformation('Username');
  const Password = getUserInformation('Password');

  const user = {
    Username,
    Email: '',
    Password,
  };

  try {
    const loginApi = new APIService('post', 'sign-in', null, user);
    const newSession = await loginApi.request();
    newSession.Password = user.Password;
    saveUser(newSession);
    return newSession.AuthToken;
  } catch (error) {
    alert('Unexpected error. We are very sorry for this unconvenient :(');
    logOut();
  }

  return null;
};
