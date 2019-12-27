const Objects = {
  rectangle: () =>
    new fabric.Rect({
      fill: "red",
      width: 20,
      height: 20,
      cornerColor: "black",
      cornerSize: 3,
      transparentCorners: false
    }),
  line: () =>
    new fabric.Line([50, 100, 200, 200], {
      stroke: "red",
      cornerColor: "black",
      cornerSize: 3,
      transparentCorners: false
    }),
  circle: () =>
    new fabric.Circle({
      radius: 30,
      fill: "#f55",
      cornerColor: "black",
      cornerSize: 3,
      transparentCorners: false
    })
};
export default Objects;
