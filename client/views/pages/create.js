import Objects from "../../services/usualObjects.js";
import functions from "../../services/objectFunctions.js";
import HistoryComponent from "../components/HistoryComponent.js";

const create = {
  render: () => {
    const historySection = new HistoryComponent();
    return `
          <main class="create-card-page">
            <section id="history-section" class="history-section">
              <h2>Previous cards</h2>
              <div class="cards">
                ${historySection.render()}
              </div>
            </section>

            <section class="canvas-section">
              <canvas id ="canvas"></canvas>
            </section>

            <section class="toolbar-section">
              <section class="toolbar-buttons">  
                <div class="toolbar-element">
                  <button id="newRect" type="button" class="toolbar-btn"> <i class="fa fa-square"></i> </button>
                  <button id="randomColor" type="button">Change color</button> 
                </div> 
                <div class="toolbar-element">
                  <button id="newCircle" type="button" class="toolbar-btn"> <i class="fa fa-circle"></i> </button>
                </div>
                <div class="toolbar-element">
                  <button id="newCircleText" type="button" class="toolbar-btn"> <i class="fa fa-text-height"></i> </button>
                </div>
                <div class="toolbar-element">
                  <button id="newDrawLine" type="button" class="toolbar-btn"> <i class="fa fa-edit"></i></button>
                  <label for="lineColor">Color:</label>
                  <input id="lineColor" type="color" name="color" class="color-input">  
                  <label for="lineWidth">Width:</label>
                  <input id="lineWidth" type="number" min="1" max="100">
                  </div>
                <div class="toolbar-element">
                  <button id="newLine" type="button" class="toolbar-btn"> <i class="fa fa-edit"></i></button>
                </div>               
              </section>
              
              <input type="range" min="0" max="1" step="0.01" value="0.5" class="slider" id="opacity">
              <button id="saveCard" type="button">Save</button>
            </section>
          </main>
            `;
  },
  registerEventHandlers: () => {
    draw();
  }
};
function draw() {
  let canvas = new fabric.Canvas("canvas", { isDrawingMode: false });
  let randomColor = document.getElementById("randomColor");
  let rectButton = document.getElementById("newRect");
  let opacitySlider = document.getElementById("opacity");
  let drawButton = document.getElementById("newDrawLine");
  let lineButton = document.getElementById("newLine");
  let save = document.getElementById("saveCard");

  opacitySlider.addEventListener("input", () => {
    functions.opacity(canvas, opacitySlider.value);
  });
  randomColor.addEventListener("click", () => {
    functions.randomColor(canvas);
  });
  rectButton.addEventListener("click", () => {
    canvas.add(Objects.rectangle());
  });

  newCircle.addEventListener("click", () => {
    canvas.add(Objects.circle());
  });

  drawButton.addEventListener("click", () => {
    const color = document.getElementById("lineColor");
    const width = document.getElementById("lineWidth");

    fabric.Object.prototype.transparentCorners = false;
    canvas.isDrawingMode = !canvas.isDrawingMode;

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
    functions.save(canvas);
  });
}
export default create;
