import Utils from "../services/Utils.js";

const functions = {
    randomColor : (canvas)=>{
        if(!canvas.getActiveObject())console.log("selecteaza ceva bos");

        else if(canvas.getActiveObject().type !== "activeSelection")
        canvas._activeObject.set('fill',getRandomRgb())
        else for (let i=0;i<canvas.getActiveObject()._objects.length;i++)
        canvas._activeObject._objects[i].set("fill",getRandomRgb())
       // console.log( canvas.getActiveObject()._objects[i])
        //canvas.discardActiveObject();
        canvas.renderAll();

    },
    opacity: (canvas,opacity) =>{
        if(!canvas.getActiveObject())console.log("selecteaza ceva bos");
        else if(canvas.getActiveObject().type !== "activeSelection")
        canvas._activeObject.set('opacity',opacity)
        else for (let i=0;i<canvas.getActiveObject()._objects.length;i++)
        canvas._activeObject._objects[i].set("opacity",opacity)
        canvas.renderAll();
    },
    save:async (canvas,description)=>{
       
    
            var settings = {
                method: 'POST',
               body: JSON.stringify({
                    "jwt": Utils.getCookie("jwt"),
                    "description":description,
                    "img":canvas.toDataURL('image/png'),
                    "data":JSON.stringify(canvas),
                }),
               headers: new Headers({
                'Content-Type': 'application/json'
              }),
               json: true };

            let response =  await fetch("http://localhost:3000/create", settings);
            let json="";
            if(response.ok){json = await response.json();}
            if(json.idCard)window.location.hash='#/card/'+json.idCard;
            else console.log("error");

    },
    update:async (canvas,description,idCard)=>{
        var settings = {
            method: 'POST',
           body: JSON.stringify({
                "jwt": Utils.getCookie("jwt"),
                "description":description,
                "idCard":idCard,
                "img":canvas.toDataURL('image/png'),
                "data":JSON.stringify(canvas),
            }),
           headers: new Headers({
            'Content-Type': 'application/json'
          }),
           json: true };

        let response =  await fetch("http://localhost:3000/update", settings);
        let json="";
        if(response.ok){json = await response.json();}
        if(json._id)window.location.hash='#/card/'+json._id;
        else console.log("error");
          console.log(json);

    }
    ,
    isOwner:async(token,idCard)=>{
        var settings = {
            method: 'POST',
           body: JSON.stringify({
                "jwt":token,
                 "id":idCard,
            }),
           headers: new Headers({
            'Content-Type': 'application/json'
          }),
           json: true };

        let response =  await fetch("http://localhost:3000/isOwner", settings);
        let json="";
        if(response.ok){json = await response.json();}
        if(json)
        if(json[0]._id){return json[0];}
        else return false;
    }


}
function getRandomRgb() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
export default functions;