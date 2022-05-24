import { useCallback, useEffect, useRef } from "react"
import { Button } from "react-bootstrap";
import { useBoundaryDraw } from "../hooks/useBounaryDraw";

export const BoundaryDraw = () => {
  const boundingAreas = useRef([[]]);
  const canvas = useRef(null)
  const img = useRef(null)

  useEffect(() => {
    img.current.src = "https://images-ext-2.discordapp.net/external/M7cZQV0Sf9jJvF7Zw1uGh8Up2kwJjcgVnqUvFX-BDCo/%3Fwidth%3D1439%26height%3D808/https/media.discordapp.net/attachments/941701003533758468/978209162586619954/unknown.png";
  }, [])

  const [handleImageLoad, handleDraw, handleAddBoundary, handleClear] = useBoundaryDraw(canvas, img, boundingAreas)

  const handleSubmit = useCallback(()=>{
    console.log(boundingAreas);
  }, [boundingAreas])

  return (
    <div>
      <h5>Boundary Drawing</h5>
      <img onLoad={handleImageLoad} ref={img} src="" alt="" style={{display:"none"}}/>
      <canvas onMouseDown={handleDraw} ref={canvas} style={{width:"100%"}} id="boundary_point_canvas"></canvas>
      <Button className="me-2" onClick={handleAddBoundary}>Add Bounding Area</Button>
      <Button className="me-2" onClick={handleClear}>Clear</Button>
      <Button className="me-2" onClick={handleSubmit}>Submit Areas</Button>
    </div>
  )
}