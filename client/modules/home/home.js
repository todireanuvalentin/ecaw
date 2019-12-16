// import "../../components/button.js";

// class Home extends HTMLElement {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     this.innerHTML = `
//     "Salut , aici e casa ta ! ;) "
//     <button-comp></button-comp>
//     `;
//   }
// }

// customElements.define("home-comp", Home);


const Home = {
  render: function() {
    console.log('Home component');
    return `
      <h1>dasd</h1>
    `;
  }
}

export default Home;