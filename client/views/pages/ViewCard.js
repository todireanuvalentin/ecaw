import { Request, BASE_URL } from "../../services/http.js";
import Utils from "../../services/Utils.js";

const ViewCard = {
  render: () => {
    return `<section id="view-section" class="view-section dark-gradient"></section>`;
  },
  registerEventHandlers: () => {
    let request = Utils.parseRequestURL();
    if (request.id) {
      const url = `${BASE_URL}/cards/${request.id}`;

      Request("GET", url).then(cards => {
        const container = document.querySelector("#view-section");
        const htmlContent = `<img alt="cardImg" src=${cards[0].img} class="card-img">`;
        container.innerHTML = htmlContent;
      });
    }
  }
};
export default ViewCard;
