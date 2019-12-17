import Utils        from './../../services/Utils.js'


let Logout = {

    render : async () => {
        let view =  /*html*/`
            logged out 
        `
        return view
    }
    , after_render: async () => {
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        window.location.hash = '#/login';
    }
}
export default Logout;