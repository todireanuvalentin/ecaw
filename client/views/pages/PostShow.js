import Utils        from './../../services/Utils.js'
import functions        from './../../services/objectFunctions.js'

let getPost = async (id) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`http://localhost:3000/get/` + id, options)
       const json = await response.json();
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let PostShow = {

    render : async () => {
        let request = Utils.parseRequestURL()
        let post = await getPost(request.id)
        let card = await functions.isOwner(Utils.getCookie("jwt"),request.id);
        let buffer = "";
        if(card)
        buffer=/*html*/`<input type="button" id="edit" value="edit">`;
        //Utils.redirectIfNotLoggedIn();
        //nu restrictionam deoarece toate cardurile sunt publice deocamdata 
        return /*html*/`
            <section class="section">
            <h1>${post[0].description}</h1>    
            <img src="${post[0].img}"</img>
               `+buffer+`
            </section>
        `
        
    }
    , after_render: async () => {
        let button = document.getElementById("edit");
        let request = Utils.parseRequestURL()
        let id =request.id;
        button.addEventListener('click',()=>{
            window.location.hash='#/create/'+id;
        })
    }
}

export default PostShow;