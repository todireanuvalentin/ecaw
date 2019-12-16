import "../../components/button.js";

class Home extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    "Salut , aici e casa ta ! ;) "
    <button-comp></button-comp>
    `;
  }
}

customElements.define("home-comp", Home);
