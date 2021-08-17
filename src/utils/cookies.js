import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import Cookies from 'universal-cookie';
// eslint-disable-next-line import/no-cycle
import { APIService } from '../services/api.service';

export const saveUser = (user, isRemember = false) => {
  const cookies = new Cookies();

  const encodeUser = AES.encrypt(JSON.stringify(user), 'Big-O Coder private key');

  if (isRemember) {
    localStorage.setItem('Big-O Coder', encodeUser.toString());
  } else if (!localStorage.getItem('Big-O Coder')) {
    const time = new Date();
    time.setDate(time.getDate() + 30);
    cookies.set('Big-O Coder', encodeUser.toString(), {
      expires: time,
      path: '/',
      sameSite: true,
    });
  } else {
    localStorage.setItem('Big-O Coder', encodeUser.toString());
  }
};

export const isLoggedIn = () => {
  try {
    const cookies = new Cookies();
    if (localStorage.getItem('Big-O Coder') || cookies.get('Big-O Coder')) {
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
  if (localStorage.getItem('Big-O Coder')) {
    getEncryptData = localStorage.getItem('Big-O Coder');
  } else {
    const cookies = new Cookies();
    getEncryptData = cookies.get('Big-O Coder');
  }

  try {
    const decrypt = AES.decrypt(getEncryptData, 'Big-O Coder private key');
    const decryptToInfo = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));

    if (option === 'all') {
      return decryptToInfo;
    }
    return decryptToInfo[option];
  } catch (error) {
    return null;
  }
};

const clearSavedData = () => {
  document.cookie = 'Big-O Coder=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'Big-O Coder=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/user;';
  localStorage.removeItem('Big-O Coder');
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
