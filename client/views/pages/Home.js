// --------------------------------
//  Define Data Sources
// --------------------------------
import Utils        from './../../services/Utils.js'

let getPostsList = async () => {
     const options = {
        method: 'POST',
        body: JSON.stringify({ "jwt": Utils.getCookie("jwt")}),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3000/get`, options)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let Home = {
    render : async () => {
        let posts = await getPostsList()
        
        await Utils.redirectIfNotLoggedIn();
        let view =  /*html*/`
            <section class="section">
                <ul>
                ${ posts.map(post => 
                    /*html*/`<li><h3>${post.description}</h3></br><a href="#/create/${post._id}">edit </a><a href="#/card/${post._id}"><img src="${post.img}" width="100px" heigth="100px"></a></li>`
                    ).join(' ')
                }
                </ul>
            </section>
        `
        return view
    }
    , after_render: async () => {
    }

}

export default Home;