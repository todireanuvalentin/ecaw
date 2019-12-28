import Login from "../views/pages/Login.js";
import Register from "../views/pages/Register.js";
import Create from "../views/pages/create.js";
import ViewCard from "../views/pages/ViewCard.js";

export default [
  {
    path: "#login",
    component: Login
  },
  {
    path: "#create",
    component: Create
  },
  {
    path: "#register",
    component: Register
  },
  {
    path: "#view",
    component: ViewCard
  }
];
