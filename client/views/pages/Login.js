import { Request } from '../../services/http.js';

const Login = {
  render: () => {
    return /*html*/ `
            <section class="section">
                <div class="field">
                    <p class="control">
                        <input class="input" id="username" type="email" placeholder="Username">
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <input class="input" id="pass" type="password" placeholder="Password">
                      
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-primary" id="loginBtn">
                        Log in
                        </button>
                    </p>
                </div>

            </section>
        `;
  },
  registerEventHandlers: () => {
    document.getElementById("loginBtn").addEventListener("click", () => {
      let user = document.getElementById("username").value;
      let password = document.getElementById("pass").value;
      const payload = { user, password };
      const url = "http://localhost:3000/login";

      Request("POST", url, payload).then(response => console.log(response));

      // fetch("http://localhost:3000/login", options)
      //   .then(response => response.json())
      //   .then(json => {
      //     if (json.error) // show error and return false
      //     if (!json.error) {
      //       setCookie("jwt", json, 1);
      //       window.location.hash = "#/";
      //     }
      //   });
    });
  }
};

function setCookie(cname, cvalue, hours) {
  var d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default Login;
