import Utils from "../../services/Utils.js";
import { Request, BASE_URL } from "../../services/http.js";

export default class HistoryComponent {
  
  registerEventHandlers(container) {
    const cardElements = container.querySelectorAll("li");

    Array.from(cardElements).map(card => {
       card.addEventListener("click", event => {
        const { id } = event.target.dataset;
        window.location.href = "#create/" + id;
        return id;
      });
    });
  }

  getCards() {
    const payload = { jwt: Utils.getCookie("jwt") };
    const url = `${BASE_URL}/card`;
    
    Request("POST", url, payload).then(cards => {
      const container = document.querySelector("#history-section .cards");
      const htmlContent = `
            <ul>
              ${cards.map(
                card =>
                  `<li data-id="${card._id}">
                  <img class="history-card-image" src="${card.img}">
                </li>`
              )}
            </ul>
            `;
      container.innerHTML = htmlContent;
      this.registerEventHandlers(container);
    });
  }

  render() {
    this.getCards();
    return "Loading...";
  }
}
