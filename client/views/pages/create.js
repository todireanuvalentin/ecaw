import Utils        from '../../services/Utils.js'


let create = {
    render : async () => {
        Utils.redirectIfNotLoggedIn();
        let view =  /*html*/`
            <section class="section">
                <h1>   Create new Card </h1>
            </section>
        `
        return view
    },
    after_render: async () => {}
        
}

export default create;