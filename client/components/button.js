class Button extends HTMLElement {
  constructor() {
    super();
  };

  connectedCallback() {
    this.innerHTML = `<button type="button"> Add </button>`;
  }
}

customElements.define("button-comp", Button);
