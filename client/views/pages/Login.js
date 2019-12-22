import Utils        from './../../services/Utils.js'



let Login = {

    render: async () => {
        return /*html*/ `
            <section class="section">
                <div class="field">
                    <p class="control">
                        <input class="input" id="username" type="email" placeholder="Username">
                      
                        
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <input class="input" id="pass" type="password" placeholder="Password">
                      
                    </p>
                </div>
              
                <div class="field">
                    <p class="control">
                        <button class="button is-primary" id="submit_btn">
                        Log in
                        </button>
                    </p>
                </div>

            </section>
        `
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {
        document.getElementById("submit_btn").addEventListener ("click",  () => {
            
            let user=document.getElementById("username").value;
            let password=document.getElementById("pass").value;
            var settings = {
                method: 'POST',
               body: JSON.stringify({ "user": user, "password":password }),
               headers: new Headers({
                'Content-Type': 'application/json'
              }),
               json: true };

           // console.log(user + " " + password)
            fetch("http://localhost:3000/login", settings)
              .then(response => response.json())
              .then(json => {
               // console.log(json)
                if(!json.error)
                {setCookie("jwt",json,1);
                window.location.hash = '#/';
                }
                else window.location.hash='#/login'
              });
              
        })
    }
}
function setCookie(cname, cvalue, hours) {
    var d = new Date();
    d.setTime(d.getTime() + (hours*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

export default Login;