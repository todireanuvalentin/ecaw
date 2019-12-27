import Utils from "../services/Utils.js";
import { Request, BASE_URL } from "../../services/http.js";

const functions = {
  randomColor: canvas => {
    if (!canvas.getActiveObject()) console.log("selecteaza ceva bos");
    else if (canvas.getActiveObject().type !== "activeSelection")
      canvas._activeObject.set("fill", getRandomRgb());
    else
      for (let i = 0; i < canvas.getActiveObject()._objects.length; i++)
        canvas._activeObject._objects[i].set("fill", getRandomRgb());
   
    canvas.renderAll();
  },
  opacity: (canvas, opacity) => {
    if (!canvas.getActiveObject()) console.log("selecteaza ceva bos");
    else if (canvas.getActiveObject().type !== "activeSelection")
      canvas._activeObject.set("opacity", opacity);
    else
      for (let i = 0; i < canvas.getActiveObject()._objects.length; i++)
        canvas._activeObject._objects[i].set("opacity", opacity);
    canvas.renderAll();
  },
  save: (canvas, idCard = null) => {
    let payload = {
      jwt: Utils.getCookie("jwt"),
      img: canvas.toDataURL("image/png"),
      data: JSON.stringify(canvas)
    };
    let method = "POST";
    if (idCard) {
      payload = {
        ...payload,
        idCard,
      }
      method = "PUT";
    }
    const url = `${BASE_URL}/create`;
    Request(method, url, payload).then(response => console.log(response));
  },
  isOwner: (token, idCard) => {
    var settings = {
      method: "POST",
      body: JSON.stringify({
        jwt: token,
        id: idCard
      }),
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      json: true
    };

    let response = fetch("http://localhost:3000/isOwner", settings);
    let json = "";
    if (response.ok) {
      json = response.json();
    }
    if (json)
      if (json[0]._id) {
        return json[0];
      } else return false;
  },
  
};
function getRandomRgb() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = (num >> 8) & 255;
  var b = num & 255;
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
export default functions;
