const Objects = {
  rectangle: () =>
    new fabric.Rect({
      fill: "red",
      width: 20,
      height: 20
    }),
  line: () =>
    new fabric.Line([50, 100, 200, 200], {
      stroke: "red"
    }),
  circle: () => new fabric.Circle({ radius: 30, fill: "#f55" })
};
export default Objects;
