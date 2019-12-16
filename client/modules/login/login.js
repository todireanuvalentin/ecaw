// import "../../components/button.js";
// import "../../components/input.js";

// class Login extends HTMLElement {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     this.innerHTML = `
//     <input-comp></input-comp>
//     <input-comp></input-comp>
//     <button-comp></button-comp>
//     `;
//   }
// }

// customElements.define("login-comp", Login);

import "../../components/button.js";

// const Login = {
//   render: function() {
//     console.log("Login component");
//     return `
//       <h1>Login</h1>
//       <button onclick="${Login.onClick}">LALALA</button>
//     `;
//   },
//   onClick: function() {
//     console.log("intra");
//   }
// };

class Login {
  render = () => {
    return `
    <h1>Login</h1>
    <button onclick="${this.onClick}">LALALA</button>
  `;
  };

  onClick = () => console.log(1);
}

export default Login;
