import Objects from "../../services/usualObjects.js";
import functions from "../../services/objectFunctions.js";
import HistoryComponent from "../components/HistoryComponent.js";
import Utils from "./../../services/Utils.js";
import { Request, BASE_URL } from "../../services/http.js";

const create = {
  render: () => {
    const historySection = new HistoryComponent();
    return `
          <main class="create-card-page">
            <div id="error-message">Card not found</div>
            <section id="history-section" class="history-section dark-gray">
              <h2 class="section-header">Previous cards</h2>
              <div class="cards">
                ${historySection.render()}
              </div>
            </section>

            <section class="canvas-section">
              <canvas id ="canvas"></canvas>
            </section>

            <section class="toolbar-section dark-gray">
              <h2 class="section-header">Toolbar</h2>
              <section class="toolbar-buttons">
                <div class="toolbar-element">
                  <button id="newRect" type="button" class="toolbar-btn"> <i class="fa fa-square"></i> </button>
                  <label for="rectColor">Color </label>
                  <input id="rectColor" type="color" name="color" class="color-input">  
                </div> 
                <div class="toolbar-element">
                  <button id="newCircle" type="button" class="toolbar-btn"> <i class="fa fa-circle"></i> </button>
                </div>
                <div class="toolbar-element">
                  <button id="newCircleText" type="button" class="toolbar-btn"> <i class="fa fa-text-height"></i> </button>
                </div>
                <div class="toolbar-element">
                  <button id="newDrawLine" type="button" class="toolbar-btn"> <i class="fa fa-edit"></i></button>
                  <label for="drawColor">Color </label>
                  <input id="drawColor" type="color" name="color" class="color-input">  
                  <label for="lineWidth">Width </label>
                  <input id="lineWidth" type="number" min="1" max="100">
                  </div>
                <div class="toolbar-element">
                  <button id="newLine" type="button" class="toolbar-btn"> <i class="fa fa-edit"></i></button>
                </div>               
              </section>

              <section class="search-section">
                <input id="search" type="text" placeholder="Search"/ >
                <button id="searchButton" type="button" class="toolbar-btn"> <i class="fa fa-search"></i></button>
                <div id="imagesSection"></div>
              </section>
              
              <button id="saveCard" type="button">Save</button>
              <button id="clearCanvas" type="button">New card</button>
            </section>
          </main>
            `;
  },
  registerEventHandlers: () => {
    draw();
  }
};

function onSelectImage(canvas, container) {
  const cardElements = container.querySelectorAll("li");

  Array.from(cardElements).map(card => {
    card.addEventListener("click", event => {
      const { id } = event.target.dataset;

      Utils.toDataURL(id).then(dataUrl => {
        fabric.Image.fromURL(dataUrl, function(img) {
          var oImg = img
            .set({
              left: 0,
              top: 0,
              cornerColor: "black",
              cornerSize: 3,
              transparentCorners: false
            })
            .scale(0.25);
          canvas.add(oImg);
        });
      });
    });
  });
}

function searchImage(canvas) {
  document.getElementById("searchButton").addEventListener("click", () => {
    const searchContent = document.getElementById("search").value;
    const url = `${BASE_URL}/images `;
    const payload = { searchContent };

    Request("POST", url, payload).then(images => {
      const searchSection = document.querySelector("#imagesSection");
      const container = `
          <ul>
            ${images.hits.map(
              image => `<li data-id="${image.largeImageURL}">
              <img class="search-card-image" src="${image.largeImageURL}">
            </li>`
            )}
          </ul>
      `;
      searchSection.innerHTML = container;
      onSelectImage(canvas, searchSection);
    });
  });
}

function draw() {
  let canvas = new fabric.Canvas("canvas", { isDrawingMode: false });
  let request = Utils.parseRequestURL();
  if (request.id) {
    const url = `${BASE_URL}/cards/${request.id}`;
    const payload = { jwt: Utils.getCookie("jwt") };
    Request("POST", url, payload).then(card => {
      if (card.length === 0) {
        const loginSection = document.getElementById("error-message");
        loginSection.className = "show";
        setTimeout(() => {
          loginSection.className = loginSection.className.replace("show", "");
        }, 3000);
        return false;
      }
      canvas.loadFromJSON(card[0].data);
    });
  }

  searchImage(canvas);

  let rectButton = document.getElementById("newRect");
  let drawButton = document.getElementById("newDrawLine");
  let lineButton = document.getElementById("newLine");
  let save = document.getElementById("saveCard");
  let clear = document.getElementById("clearCanvas");

  rectButton.addEventListener("click", () => {
    canvas.add(Objects.rectangle());
    const color = document.getElementById("rectColor");
    color.addEventListener("input", () =>
      functions.changeColor(canvas, color.value)
    );
  });

  newCircle.addEventListener("click", () => {
    canvas.add(Objects.circle());
  });

  drawButton.addEventListener("click", () => {
    const color = document.getElementById("drawColor");
    const width = document.getElementById("lineWidth");

    fabric.Object.prototype.transparentCorners = false;
    canvas.isDrawingMode = !canvas.isDrawingMode;

    canvas.isDrawingMode === true
      ? drawButton.classList.add("active")
      : drawButton.classList.remove("active");

    color.addEventListener(
      "input",
      () => (canvas.freeDrawingBrush.color = color.value)
    );
    width.addEventListener(
      "input",
      () => (canvas.freeDrawingBrush.width = width.value)
    );
  });

  lineButton.addEventListener("click", () => {
    canvas.add(Objects.line());
  });

  save.addEventListener("click", () => {
    functions.save(canvas, request.id);
  });

  clear.addEventListener("click", () => {
    canvas.clear();
    window.location.href = "#create";
  });
}
export default create;
