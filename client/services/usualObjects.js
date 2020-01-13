const Objects = {
  rectangle: () =>
    new fabric.Rect({
      fill: "red",
      width: 200,
      height: 200,
      cornerColor: "black",
      cornerSize: 24,
      transparentCorners: false
    }),
  line: () =>
    new fabric.Line([50,300, 300, 300], {
      stroke: "black",
      cornerColor: "black",
      width: 20,
      cornerSize: 24,
      transparentCorners: false
    }),  
  text: (addText,tcolor)=>new fabric.Textbox(addText, {
    left: 50,
    top: 50,
    fill:tcolor,
    width: 150,
    fontSize: 20
  }),
  circle: () =>
    new fabric.Circle({
      radius: 30,
      fill: "#f55",
      cornerColor: "black",
      cornerSize: 24,
      transparentCorners: false
    })
};
export default Objects;
