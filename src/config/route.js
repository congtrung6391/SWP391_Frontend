require('dotenv').config();

export const BASE = process.env.REACT_APP_BASE_URL;

// auth
export const REGISTER = `${BASE}/auth/signup`;
export const LOGIN = `${BASE}sign-in`;
export const VERIFY_TOKEN = `${BASE}verify-token`;

// users
export const USERS = 'users?:queryString';
export const USER = 'users/:id';
export const USER_TYPE = 'usertypes';
export const USER_PASSWORD = 'users/reset-password';
export const CONNECT_GOOGLE = 'users/:uid/connect-google';
export const CONNECT_FACEBOOK = 'users/:uid/connect-facebook';
