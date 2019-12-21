import Utils        from '../../services/Utils.js'
import Objects from '../../services/usualObjects.js'
import functions from '../../services/objectFunctions.js'


let create = {
        
      
    render : async () => {
        
        
        Utils.redirectIfNotLoggedIn();
        let view =  /*html*/`
            <section class="section">
            <canvas id ="c" width="500" height="600" style="border:1px solid"></canvas>
            <input id="newRect" type="button" value="new rect"></input> 
            <input id="randomColor" type="button" value="random color"></input> 
            <input type="range" min="0" max="1" step="0.01" value="0.5" class="slider" id="opacity">
            </div>
            
            </section>
        `
        return view
    },
    after_render: async () => {
        draw();
    }
        
}
function draw(){
  let canvas = new fabric.Canvas('c');
  let randomColor = document.getElementById("randomColor");
  let rectButton = document.getElementById("newRect");  
  let opacitySlider = document.getElementById("opacity");

  opacitySlider.addEventListener('input',()=>{functions.opacity(canvas,opacitySlider.value)})
  randomColor.addEventListener('click',()=>{functions.randomColor(canvas)})
  rectButton.addEventListener('click',()=>{canvas.add(Objects.rectangle())}) 
  

}
export default create;