import Utils        from './../../services/Utils.js'



let Navbar = {
    render: async () => {
        let loggedData =  /*html*/ `
        <div class="navbar-start">
        <a class="navbar-item" href="/#/create">
            Create new Card
        </a>
        <a class="navbar-item" href="/#/secret">
            Secret
        </a>
    </div>`;
            let view1 =  /*html*/ `
        <nav class="navbar" role="navigation" aria-label="main navigation">
           <div class="container">
               <div class="navbar-brand">
                   <a class="navbar-item" href="/#/">
                       <img src="views/images/home.png" width="AUTO" height="AUTO">
                   </a>

                   <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                       <span aria-hidden="true"></span>
                       <span aria-hidden="true"></span>
                       <span aria-hidden="true"></span>
                   </a>
               </div>`
        
               let view2_1 =  /*html*/ `
                    <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
                       
                        <div class="navbar-end">
                            <div class="navbar-item">
                                `;

                let view2_2 = /*html*/`
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        let view2RS = /*html*/ `
        <div class="buttons">
        <a class="button is-primary" href="/#/register">
            <strong>Sign up</strong>
        </a>
        <a class="button is-light"  href="/#/login">
            Log in
        </a>
        </div>`;
        let view2AR = /*html*/ `
        <div class="buttons">
    
        <a class="button is-light"  href="/#/logout">
            Log OUT
        </a>
        </div>`;
        
        
        
        
        
        
        let isLoggedIn =await Utils.loggedIn();
        let view,view2;
        //console.log(isLoggedIn);
        if(!isLoggedIn)
        view2 = view2_1 +view2RS+view2_2;
        else 
        view2 = view2_1 +view2AR+view2_2;

        if(!isLoggedIn)
        view =view1 + view2;
        else view = view1 + loggedData + view2;


        return view
    },
    after_render: async () => { }

}
export default Navbar;