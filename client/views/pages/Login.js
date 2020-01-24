import { Request, BASE_URL } from "../../services/http.js";
import Utils from "../../services/Utils.js";

const Login = {
  render: () => {
    return `
    <div id="error-message">Username or password is incorrect! Please try again!</div>
    <div class="login-page-wrapper dark-gradient">
      <section class="login-section">
        <label for="username">Username</label>
        <input id="username" type="email" />
        <label for="pass">Password</label>
        <input id="pass" type="password" />
        <div class="action-login-section">
          <button id="loginBtn" class="login-button">Log in</button>
          <button id="goToRegisterBtn" class="register-button">Register</button>
        </div>
      </section>
    </div>
    `;
  },
  registerEventHandlers: () => {
    document.getElementById("loginBtn").addEventListener("click", () => {
      let user = document.getElementById("username").value;
      let password = document.getElementById("pass").value;
      const payload = { user, password };
      const url = `${BASE_URL}/login`;

      if (user && password)
        Request("POST", url, payload).then(json => {
          if (json.message === "Login failed" || json.error) {
            const loginSection = document.getElementById("error-message");
            loginSection.className = "show";
            setTimeout(() => {
              loginSection.className = loginSection.className.replace(
                "show",
                ""
              );
            }, 3000);
            return false;
          } else {
            Utils.setCookie("jwt", json.token, 1);
            window.location.hash = "#create";
          }
        });
      else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.className = "show";
        setTimeout(() => {
          errorMessage.className = errorMessage.className.replace("show", "");
        }, 3000);
        return false;
      }
    });

    document.getElementById("goToRegisterBtn").addEventListener("click", () => {
      window.location.hash = "#register";
    });
  }
};

export default Login;
