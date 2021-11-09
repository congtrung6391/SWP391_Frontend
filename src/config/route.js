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
export const TUTORS = 'tutor';
export const USER_PROFILE = 'user/:id/profile';
export const USER_ROLE = "user/:id/change-role";

// rating
export const RATINGS = "user/:uid/rating";
export const RATING_ID = "user/:uid/rating/:rid";

// courses
export const SUBJECTS = 'course/subject';
export const COURSES = 'course';
export const COURSE_INFO = 'course/:id/info';
export const COURSE_ID = 'course/:id';
export const COURSE_REGISTER = 'course/:id/register';
export const COURSE_TOGGLE_PUBLIC = 'course/:id/toggle-public';
export const COURSE_STUDENT = 'course/:id/student';
export const COURSE_STUDENT_ID = 'course/:id/student/:sid';

// material
export const COURSE_MATERIAL = 'course/:cid/material';
export const COURSE_MATERIAL_ID = 'course/:cid/material/:mid';

// timetable
export const COURSE_TIMETABLE = 'course/:cid/timetable';
export const COURSE_TIMETABLE_ID = 'course/:cid/timetable/:tid';

// forum
export const QUESTION = 'forum/question';
export const QUESTION_ID = 'forum/question/:qid';
export const ANSWER = 'forum/question/:qid/answer';
export const ANSWER_ID = 'forum/question/:qid/answer/:aid';