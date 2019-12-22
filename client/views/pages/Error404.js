import Utils from "./../../services/Utils.js";

let Error404 = {
  render: async () => {
    await Utils.redirectIfNotLoggedIn();
    let view = /*html*/ `
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `;
    return view;
  },
  registerEventHandlers: async () => {}
};
export default Error404;
