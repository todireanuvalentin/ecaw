class Input extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<input type="text" >`;
  }
}

customElements.define("input-comp", Input);
