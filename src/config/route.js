require('dotenv').config();

export const BASE = process.env.REACT_APP_BASE_URL;

// auth
export const REGISTER = `${BASE}auth/signup`;
export const LOGIN = `${BASE}auth/log-in`;
export const VERIFY_TOKEN = `${BASE}auth/verify-authorization`;

// users
export const USERS = 'get-user-list';
export const USER = 'user/:id';
export const USER_TYPE = 'usertypes';
export const USER_PASSWORD = 'users/reset-password';

// courses
export const SUBJECTS = 'course/subject';
export const COURSES = 'course';
export const COURSE_ID = 'course/:id';

// material

// timetable

// post
