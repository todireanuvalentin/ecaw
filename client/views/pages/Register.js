import Utils        from './../../services/Utils.js'




let Register = {

    render: async () => {
        return /*html*/ `
            <section class="section">
                <div class="field">
                    <p class="control">
                        <input class="input" id="username" type="email" placeholder="Enter your username" required>
                        
                       
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <input class="input" id="password" type="password" placeholder="Enter a Password" required>
                        
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <input class="input" id="rpassword" type="password" placeholder="Enter the same Password again" required>
                      
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button type="submit" class="button is-primary" id="submit">
                        Register
                        </button>
                    </p>
                </div>

            </section>
        `
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {
        document.getElementById("submit").addEventListener ("click",  () => {
            let user=document.getElementById("username").value;
            let password=document.getElementById("password").value;
            let rpassword=document.getElementById("rpassword").value;
            var settings = {
                method: 'POST',
               body: JSON.stringify({ "user": user, "password":password }),
               headers: new Headers({
                'Content-Type': 'application/json'
              }),
               json: true };

            
              if(password == rpassword && user !='')
            fetch("http://localhost:3000/register", settings)
              .then(response => response.json())
              .then(json => {
                if (json.message){
                    console.log("register succesfully");
                    window.location.hash='#/login'}
                else alert("register error");
              });
              else alert("invalid data ");



        })
    }
}

export default Register;