import Utils from "../services/Utils.js";
import { Request, BASE_URL } from "../../services/http.js";

const functions = {
  changeColor: (canvas, color) => {
    if (!canvas.getActiveObject()) console.error("Select an element");
    else if (canvas.getActiveObject().type !== "activeSelection")
      canvas._activeObject.set("fill", color);
    else
      for (let i = 0; i < canvas.getActiveObject()._objects.length; i++)
        canvas._activeObject._objects[i].set("fill", color);
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
        idCard
      };
      method = "PUT";
    }
    const url = `${BASE_URL}/create`;
    Request(method, url, payload).then(response => console.log(response));
  }
};

export default functions;
