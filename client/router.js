import "/modules/login/login.js"
import "/modules/home/home.js"


class Router extends HTMLElement {
    constructor() {
      super();

    }
    
    connectedCallback() {
        var hash = window.location.hash.substr(1);
        console.log(hash)
        if(hash == "")
        this.innerHTML = `
      <login-comp></login-comp>
      `;
        else if (hash == "home")
        this.innerHTML = `
        <home-comp></home-comp>
        `;
        

    }
    calle(){
        this.connectedCallback();
    }
  }
   
  customElements.define("router-comp", Router);

  window.addEventListener("hashchange",function (){
      console.log(Router.call());
      console.log("e bine " + window.location.hash.substr(1));
    location.hash = "#"+window.location.hash.substr(1);
  });