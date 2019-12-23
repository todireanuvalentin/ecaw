import { Request, BASE_URL } from "../../services/http.js";

const Register = {
  render: () => {
    return `
      <div id="error-message">Something went wrong. Please try again!</div>
      <div id="server-error-message">Username already exists</div>
      <section class="register-section">
        <label for="username">Username</label>
        <input id="username" type="email" required />
        <label for="password">Password</label>
        <input id="password" type="password" required />
        <label for="rpassword">Password</label>
        <input id="rpassword" type="password" required />
        <button type="submit" class="register-button" id="submit">Register</button>
      </section> `;
  },
  registerEventHandlers: () => {
    document.getElementById("submit").addEventListener("click", () => {
      let user = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let rpassword = document.getElementById("rpassword").value;
      const url = `${BASE_URL}/register`;
      const payload = { user, password, rpassword };

      if (password === rpassword && user && password && rpassword)
        Request("POST", url, payload)
          .then(json => {
            if (json.error) {
              const errorMessage = document.getElementById("error-message");
              errorMessage.className = "show";
              setTimeout(() => {
                errorMessage.className = errorMessage.className.replace(
                  "show",
                  ""
                );
              }, 3000);
              return false;
            } else {
              if (json.message === "Username already exists") {
                const errorMessage = document.getElementById(
                  "server-error-message"
                );
                errorMessage.className = "show";
                setTimeout(() => {
                  errorMessage.className = errorMessage.className.replace(
                    "show",
                    ""
                  );
                }, 3000);
                return false;
              } else window.location.hash = "#create";
            }
          })
          .catch(msg => console.log("intra in catch"));
      else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.className = "show";
        setTimeout(() => {
          errorMessage.className = errorMessage.className.replace("show", "");
        }, 3000);
        return false;
      }
    });
  }
};

export default Register;
