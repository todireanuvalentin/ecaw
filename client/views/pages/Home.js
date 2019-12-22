import Utils from "./../../services/Utils.js";

let getPostsList = () => {
  const options = {
    method: "POST",
    body: JSON.stringify({ jwt: Utils.getCookie("jwt") }),
    headers: {
      "Content-Type": "application/json"
    }
  };
  fetch(`http://localhost:3000/get`, options)
  .then(response => response.json())
  
};

let Home = {
  render: () => {
    //let posts = await getPostsList();

    //await Utils.redirectIfNotLoggedIn();
    let view = /*html*/ `
            <section class="section">
                <h1>Home</h1>
            </section>
        `;
    return view;
  },
};

export default Home;
