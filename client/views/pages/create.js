import Utils        from '../../services/Utils.js'


let create = {
        
      
    render : async () => {
        
        
        Utils.redirectIfNotLoggedIn();
        let view =  /*html*/`
            <section class="section">
            <div class="canvas-container" style="width: 400px; height: 350px; position: relative; user-select: none;"><canvas id="c1" width="359.99999046325684" height="314.99999165534973" class="lower-canvas" style="position: absolute; width: 400px; height: 350px; left: 0px; top: 0px; touch-action: none; user-select: none;"></canvas><canvas class="upper-canvas " width="400" height="350" style="position: absolute; width: 400px; height: 350px; left: 0px; top: 0px; touch-action: none; user-select: none; cursor: default;"></canvas></div>
            <div class="canvas-container" style="width: 400px; height: 350px; position: relative; user-select: none;"><canvas id="c2" width="359.99999046325684" height="314.99999165534973" class="lower-canvas" style="position: absolute; width: 400px; height: 350px; left: 0px; top: 0px; touch-action: none; user-select: none;"></canvas><canvas class="upper-canvas " width="400" height="350" style="position: absolute; width: 400px; height: 350px; left: 0px; top: 0px; touch-action: none; user-select: none; cursor: default;"></canvas></div>
            </section>
        `
        return view
    },
    after_render: async () => {
        draw();
    }
        
}
function draw(){
    fabric.Object.prototype.transparentCorners = false;
    let __canvases = [];
  
    var i, dot,
      t1, t2,
      startTimer = function() {
        t1 = new Date().getTime();
        return t1;
      },
      stopTimer = function() {
        t2 = new Date().getTime();
        return t2 - t1;
      },
      getRandomInt = fabric.util.getRandomInt,
      rainbow    = ["#ffcc66", "#ccff66", "#66ccff", "#ff6fcf", "#ff6666"],
      rainbowEnd = rainbow.length - 1;
  
    //
    // Rendering canvas #1
    //
    var canvas1  = new fabric.Canvas('c1', { backgroundColor: "#000" }),
        results1 = document.getElementById('results-c1');
  
    startTimer();
    for (i = 100; i >= 0; i--) {
      dot = new fabric.Circle({
        left:   getRandomInt(0, 400),
        top:    getRandomInt(0, 350),
        radius: 3,
        fill:   rainbow[getRandomInt(0, rainbowEnd)],
        objectCaching: false
      });
      canvas1.add(dot);
    }
    //results1.innerHTML = 'Regular ( objectCaching = false ) rendering of 100 elements in ' + stopTimer() + 'ms';
    __canvases.push(canvas1);
}
export default create;