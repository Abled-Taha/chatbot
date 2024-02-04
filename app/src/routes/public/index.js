import Login from "../../views/login";
import Student from "../../views/student";
import Teacher from "../../views/teacher";
import Welcome from "../../views/welcome";
import { studentChat, teacherChat, welcome, login } from "../pathName";

export const PublicRoutes = [
  {
    title: "Welcome",
    component: Welcome,
    path: welcome,
  },
  {
    title: "Login",
    component: Login,
    path: login,
  },
  {
    title: "Student",
    component: Student,
    path: studentChat,
  },
  {
    title: "Teacher",
    component: Teacher,
    path: teacherChat,
  },
];
