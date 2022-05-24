import { useCallback } from "react";

export const useBoundaryDraw = (canvas, image, boundingAreas) => {
  function mulberry32(a) {
    let t = a + 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  const dynamicColor = useCallback((index, a) => {
    let r = Math.floor(mulberry32(index) * 255);
    let g = Math.floor(mulberry32(index + 42) * 255);
    let b = Math.floor(mulberry32(index + 1024) * 255);
    console.log(r, g, b);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }, []);

  const drawBackground = useCallback(() => {
    canvas.current.height = image.current.height * (canvas.current.width / image.current.width);
    canvas.current.getContext("2d").drawImage(image.current, 0, 0, canvas.current.width, canvas.current.height);
  }, [canvas, image])

  const drawLines = useCallback(() => {
    console.log(boundingAreas.current);
    var ctx = canvas.current.getContext("2d")
    
    for (let i = 0; i < boundingAreas.current.length; i++) {
      // draw vertecies
      ctx.fillStyle = dynamicColor(i, 1);
      for (let j = 0; j < boundingAreas.current[i].length; j++) {
        ctx.beginPath();
        ctx.arc(
          boundingAreas.current[i][j][0] * canvas.current.width,
          boundingAreas.current[i][j][1] * canvas.current.height,
          500/canvas.current.width, 0, 2 * Math.PI, false);
        ctx.fill();
      }

      // fill polygon
      if (boundingAreas.current[i].length > 0) {
        ctx.fillStyle = dynamicColor(i, 0.5);
        ctx.beginPath();
        ctx.moveTo(
          boundingAreas.current[i][0][0] * canvas.current.width, 
          boundingAreas.current[i][0][1] * canvas.current.height
        );
        for (let j = 1; j < boundingAreas.current[i].length; j++) {
          ctx.lineTo(boundingAreas.current[i][j][0] * canvas.current.width, boundingAreas.current[i][j][1] * canvas.current.height);
        }
        ctx.closePath();
        ctx.fill();
      }
    }
  }, [canvas, boundingAreas, dynamicColor])

  const draw = useCallback(() => {
    canvas.current.getContext("2d").clearRect(0, 0, canvas.current.width, canvas.current.height);
    drawBackground();
    drawLines();
  }, [canvas, drawBackground, drawLines])

  const handleDraw = useCallback(
    (event) => {
      let rect = canvas.current.getBoundingClientRect();
      let x = event.clientX - rect.left;
      let y = event.clientY - rect.top;
      let x_percent = x / canvas.current.clientWidth;
      let y_percent = y / canvas.current.clientHeight;
      boundingAreas.current[boundingAreas.current.length - 1].push([x_percent, y_percent]);
      draw();
    },
    [boundingAreas, canvas, draw],
  )

  const handleAddBoundary = useCallback(() => {
    boundingAreas.current.push([]);
  }, [boundingAreas])

  const handleClear = useCallback(() => {
    boundingAreas.current = [[]];
    draw();
  }, [boundingAreas, draw])

  const handleImageLoad = useCallback(
    (e) => {
      draw();
    },
    [draw],
  )

  return [handleImageLoad, handleDraw, handleAddBoundary, handleClear]
}