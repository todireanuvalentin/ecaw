import Login from "../views/pages/Login.js";
import Home from "../views/pages/Home.js";
import Create from "../views/pages/create.js";

export default [
  {
    path: "#",
    component: Home
  },
  {
    path: "#login",
    component: Login
  },
  {
    path: "#create",
    component: Create
  }
];
