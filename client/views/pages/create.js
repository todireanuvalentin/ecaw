import Utils from "../../services/Utils.js";
import Objects from "../../services/usualObjects.js";
import functions from "../../services/objectFunctions.js";

let create = {
  render: () => {
    let view = /*html*/ `
            <section class="section">
            <label for="description" >Description</label>
            <input type="text" id="description">
            <canvas id ="c" width="500" height="600" style="border:1px solid"></canvas>
            <input id="newRect" type="button" value="new rect"></input> 
            <input id="randomColor" type="button" value="random color"></input> 
            <input type="range" min="0" max="1" step="0.01" value="0.5" class="slider" id="opacity">
            <input type="submit" id="saveCard" value="Save card">
            </div>
            
            </section>
        `;
    return view;
  },
  registerEventHandlers: async () => {
    draw();
  }
};
async function draw() {
  let canvas = new fabric.Canvas("c");
  let randomColor = document.getElementById("randomColor");
  let rectButton = document.getElementById("newRect");
  let opacitySlider = document.getElementById("opacity");
  let save = document.getElementById("saveCard");
  let description = document.getElementById("description");

  opacitySlider.addEventListener("input", () => {
    functions.opacity(canvas, opacitySlider.value);
  });
  randomColor.addEventListener("click", () => {
    functions.randomColor(canvas);
  });
  rectButton.addEventListener("click", () => {
    canvas.add(Objects.rectangle());
  });

  //code for editing
  let request = Utils.parseRequestURL();
  //console.log(request.id)
  let card = await functions.isOwner(Utils.getCookie("jwt"), request.id);
  if (card) {
    canvas.loadFromJSON(card.data);
    description.value = card.description;
    save.addEventListener("click", () => {
      functions.update(canvas, description.value, request.id);
    });
  } else {
    save.addEventListener("click", () => {
      functions.save(canvas, description.value);
    });
    window.location.hash = "#/create";
  }
}
export default create;
