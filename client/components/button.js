class Button extends HTMLElement {
  constructor() {
    super();
  };

  connectedCallback() {
    this.innerHTML = `<button type="button"> Login </button>`;
  }
}

customElements.define("button-comp", Button);
