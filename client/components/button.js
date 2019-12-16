class Button extends HTMLElement {
  constructor() {
    super();
  };

  connectedCallback() {
    this.innerHTML = `<button type="button" onclick="document.location+='#home';return false;"> Login </button>`;
  }
}

customElements.define("button-comp", Button);
