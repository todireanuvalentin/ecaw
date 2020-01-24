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
            <div id="copy-message">Link copied to clipboard</div>
            <section id="history-section" class="history-section dark-gray">
              <h2 class="section-header">Previous cards</h2>
              <div class="cards">
                ${historySection.render()}
              </div>
            </section>

            <section id="canvas-container" class="canvas-section">
              <canvas id ="canvas"></canvas>
              <section class="action-section">
                <button id="saveCard" class="dark-gray" type="button">Save</button>
                <button id="clearCanvas" class="dark-gray" type="button">New card</button>
                <button id="generateId" class="dark-gray" type="button" style="display: none">Share</button>
              </section>
            </section>

            <section class="toolbar-section dark-gray">
              <h2 class="section-header">Toolbar</h2>
              <section class="toolbar-buttons">
                <div class="section">
                  <div class="toolbar-element shapes">
                    <h5> Elements </h5>
                    <button id="newRect" type="button" class="toolbar-btn"> <i class="fa fa-square"></i> </button>
                    <button id="newLine" type="button" class="toolbar-btn"> <i class="fa  fa-long-arrow-right"></i></button>
                    <button id="newCircle" type="button" class="toolbar-btn"> <i class="fa fa-circle"></i> </button>
                  </div> 
                  
                  <div class="toolbar-element actions">
                    <h5>Actions</h5>
                    <label for="changeColors">Color </label>
                    <input id="changeColors" type="color" name="color" class="color-input"> 
                    <button id="delete" type="button" class="toolbar-btn"> <i class="fa fa-trash"></i></button>
                  </div>
                </div>
                <div class="toolbar-element draw section">
                  <h5>Draw</h5>
                  <button id="newDrawLine" type="button" class="toolbar-btn"> <i class="fa fa-edit"></i></button>
                  <label for="drawColor">Color </label>
                  <input id="drawColor" type="color" name="color" class="color-input">  
                  <label for="lineWidth">Width </label>
                  <input id="lineWidth" type="number" min="1" max="100">
                  </div>

                <div class="text-section text section">
                  <h5> Text </h5>
                  <input id="addText" type="text" class="text-input" placeholder="Write text here">
                  <button id="newText" type="button" > <i class="fa fa-plus"></i> </button>
                  <input id="textColor" type="color" name="color" class="color-input">  
                </div>     
              </section>

              <div class=" toolbar-element section"> 
                <div class="toolbar-element image">
                  <h5> Image </h5>
                  <input type="file" name="imageUpload" id="addImage" style="display:none"/> 
                  <label for="addImage" class="button-style">Upload <i class="fa fa-picture-o" aria-hidden="true"></i></label>
                  </div>   
                <section class="search-section">
                  <input id="search" type="text" placeholder="Search"/ >
                  <button id="searchButton" type="button" class="toolbar-btn"> <i class="fa fa-search"></i></button>
                  <div id="imagesSection"></div>
                </section>
              </div>
                
               
            </section>
          </main>
            `;
  },
  registerEventHandlers: () => {
    draw();
  }
};

fabric.Canvas.prototype.initialize = (function(originalFn) {
  return function(...args) {
    originalFn.call(this, ...args);
    this._historyInit();
    return this;
  };
})(fabric.Canvas.prototype.initialize);

fabric.Canvas.prototype.dispose = (function(originalFn) {
  return function(...args) {
    originalFn.call(this, ...args);
    this._historyDispose();
    return this;
  };
})(fabric.Canvas.prototype.dispose);
fabric.Canvas.prototype._historyNext = function() {
  return JSON.stringify(this.toDatalessJSON(this.extraProps));
};
fabric.Canvas.prototype._historyEvents = function() {
  return {
    "object:added": this._historySaveAction,
    "object:removed": this._historySaveAction,
    "object:modified": this._historySaveAction,
    "object:skewing": this._historySaveAction
  };
};

fabric.Canvas.prototype._historyInit = function() {
  this.historyUndo = [];
  this.historyRedo = [];
  this.historyNextState = this._historyNext();

  this.on(this._historyEvents());
};
fabric.Canvas.prototype._historyDispose = function() {
  this.off(this._historyEvents());
};
fabric.Canvas.prototype._historySaveAction = function() {
  if (this.historyProcessing) return;

  const json = this.historyNextState;
  this.historyUndo.push(json);
  this.historyNextState = this._historyNext();
  this.fire("history:append", { json: json });
};
fabric.Canvas.prototype.undo = function() {
  this.historyProcessing = true;

  const history = this.historyUndo.pop();
  if (history) {
    this.historyRedo.push(this._historyNext());

    this.loadFromJSON(history).renderAll();
    this.fire("history:undo");
  }

  this.historyProcessing = false;
};
fabric.Canvas.prototype.redo = function() {
  this.historyProcessing = true;
  const history = this.historyRedo.pop();
  if (history) {
    this.historyUndo.push(this._historyNext());

    this.loadFromJSON(history).renderAll();
    this.fire("history:redo");
  }

  this.historyProcessing = false;
};
fabric.Canvas.prototype.clearHistory = function() {
  this.historyUndo = [];
  this.historyRedo = [];
  this.fire("history:clear");
};
let _clipboard = 0;
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
              cornerSize: 10,
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
function Copy(canvas) {
  canvas.getActiveObject().clone(function(cloned) {
    _clipboard = cloned;
  });
}

function Paste(canvas) {
  _clipboard.clone(function(clonedObj) {
    canvas.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true
    });
    if (clonedObj.type === "activeSelection") {
      clonedObj.canvas = canvas;
      clonedObj.forEachObject(function(obj) {
        canvas.add(obj);
      });
      clonedObj.setCoords();
    } else {
      canvas.add(clonedObj);
    }
    _clipboard.top += 10;
    _clipboard.left += 10;
    canvas.setActiveObject(clonedObj);
    canvas.requestRenderAll();
  });
}
function draw() {
  let canvas = new fabric.Canvas("canvas", { isDrawingMode: false });
  canvas._historyInit();
  let containerSize = {
    width: document.getElementById("canvas-container").offsetWidth,
    height: document.getElementById("canvas-container").offsetHeight
  };

  canvas.setWidth(containerSize.width);
  canvas.setHeight(containerSize.height);
  let request = Utils.parseRequestURL();
  if (request.id) {
    let generateId = document.getElementById("generateId");
    generateId.style.display = "inline";
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
  let newText = document.getElementById("newText");
  let lineButton = document.getElementById("newLine");
  let deleteButton = document.getElementById("delete");
  let save = document.getElementById("saveCard");
  let clear = document.getElementById("clearCanvas");
  let generateId = document.getElementById("generateId");

  rectButton.addEventListener("click", () => {
    canvas.add(Objects.rectangle());
  });
  const color = document.getElementById("changeColors");
  color.addEventListener("input", () =>
    functions.changeColor(canvas, color.value)
  );

  newCircle.addEventListener("click", () => {
    canvas.add(Objects.circle());
  });
  document.getElementById("addImage").addEventListener("change", function() {
    if (this.files && this.files[0]) {
      var file = this.files[0];
      var reader = new FileReader();
      reader.onloadend = function() {
        fabric.Image.fromURL(reader.result, function(img) {
          var oImg = img
            .set({
              left: 0,
              top: 0,
              cornerColor: "black",
              cornerSize: 10,
              transparentCorners: false
            })
            .scale(0.25);
          canvas.add(oImg);
        });
      };

      reader.readAsDataURL(file);
    }
  });
  document.body.addEventListener(
    "keydown",
    function(e) {
      e = e || window.event;
      var key = e.which || e.keyCode; 
      var ctrl = e.ctrlKey ? e.ctrlKey : key === 17 ? true : false; 

      if (key == 86 && ctrl) {
        Paste(canvas);
      } else if (key == 67 && ctrl) {
        Copy(canvas);
      } else if (key == 90 && ctrl) {
        canvas.undo();
      } else if (key == 88 && ctrl) {
        canvas.redo();
      }
    },
    false
  );

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
    const historySection = new HistoryComponent();
    functions.save(canvas, request.id).then(() => historySection.render());
    window.location.href = "#create/";
  });
  newText.addEventListener("click", () => {
    let addText = document.getElementById("addText").value;
    let color = document.getElementById("textColor").value;
    canvas.add(Objects.text(addText, color));
  });

  clear.addEventListener("click", () => {
    canvas.clear();
    window.location.href = "#create";
  });
  deleteButton.addEventListener("click", () => {
    var selection = canvas.getActiveObject();
    if (selection.type === "activeSelection") {
      selection.forEachObject(function(element) {
        canvas.remove(element);
      });
    } else {
      canvas.remove(selection);
    }
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  });

  generateId.addEventListener("click", () => {
    navigator.clipboard.writeText(`http://localhost:5500/#view/${request.id}`);
    const loginSection = document.getElementById("copy-message");
    loginSection.className = "show";
    setTimeout(() => {
      loginSection.className = loginSection.className.replace("show", "");
    }, 3000);
    return false;
  });
}
export default create;
