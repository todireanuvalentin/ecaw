import "../../components/button.js";
import "../../components/input.js";

class Login extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <input-comp></input-comp>
    <input-comp></input-comp>
    <button-comp></button-comp>
    `;
  }
}

customElements.define("login-comp", Login);
