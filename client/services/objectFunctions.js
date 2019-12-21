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