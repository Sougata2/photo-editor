import { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import * as fabric from "fabric";
import BackButton from "../UI/BackButton";
import StyledPhoto from "../UI/StyledPhoto";
import HalfWidth from "../UI/HalfWidth";
import ImageContainer from "../UI/ImageContainer";
import ConfigContainer from "../UI/ConfigContainer";
import ShapeContainer from "../UI/ShapeContainer";
import StyledTextArea from "../UI/StyledTextArea";

function Photo() {
  const { id } = useParams();
  const [client] = useOutletContext();
  const [isLoading, setIsLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(
    function () {
      async function getPhotoById(id) {
        setIsLoading(true);
        const response = await client.photos.show({ id });
        setPhoto(response);
      }
      getPhotoById(id);
      setIsLoading(false);
    },
    [client.photos, id]
  );

  useEffect(
    function () {
      let canvas;
      if (containerRef.current) {
        canvas = new fabric.Canvas(document.getElementById("canvas"));
        document.getElementById("canvas").style.border = "1px dotted black";
        console.log(containerRef.current);
        const imgContainerRect = containerRef.current.getBoundingClientRect();
        canvas.setWidth(imgContainerRect.width);
        canvas.setHeight(imgContainerRect.height);
      }

      if (photo) {
        const imageEle = document.createElement("img");
        imageEle.src = photo.src.medium;
        imageEle.crossOrigin = "Anonymous";
        imageEle.onload = () => {
          let image = new fabric.Image(imageEle);
          canvas.add(image);
          canvas.centerObject(image);
          canvas.setActiveObject(image);
        };

        canvasRef.current = canvas;

        return () => {
          canvas.dispose();
        };
      }
    },
    [photo]
  );

  const addText = () => {
    const text = new fabric.IText(caption, {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: "#000",
      editable: true,
    });
    canvasRef.current.add(text);
  };

  // Add Rectangle to the canvas
  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      fill: "blue",
      width: 100,
      height: 100,
      selectable: true,
    });
    canvasRef.current.add(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 150,
      top: 150,
      fill: "green",
      radius: 50,
      selectable: true,
    });
    canvasRef.current.add(circle);
  };

  const addTriangle = () => {
    const triangle = new fabric.Triangle({
      left: 200,
      top: 200,
      fill: "orange",
      width: 100,
      height: 100,
      selectable: true,
    });
    canvasRef.current.add(triangle);
  };

  const addPolygon = () => {
    const polygon = new fabric.Polygon(
      [
        { x: 200, y: 0 },
        { x: 250, y: 50 },
        { x: 200, y: 100 },
        { x: 150, y: 50 },
      ],
      {
        left: 200,
        top: 150,
        fill: "purple",
        selectable: true,
      }
    );
    canvasRef.current.add(polygon);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL({
      format: "png",
      quality: 0.8,
    });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "canvas-image.png";
    link.click();
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <StyledPhoto>
      <BackButton />
      <HalfWidth>
        <ImageContainer ref={containerRef}>
          <canvas ref={canvasRef} id="canvas" />
        </ImageContainer>
        <ConfigContainer>
          <button onClick={addText}>Add Captions</button>
          <ShapeContainer>
            <button onClick={addRectangle}>Add Rectangle</button>
            <button onClick={addCircle}>Add Circle</button>
            <button onClick={addTriangle}>Add Triangle</button>
            <button onClick={addPolygon}>Add Polygon</button>
          </ShapeContainer>
          <StyledTextArea
            onChange={(e) => setCaption(e.target.value)}
          ></StyledTextArea>
          <button onClick={downloadCanvas}>Download</button>
        </ConfigContainer>
      </HalfWidth>
    </StyledPhoto>
  );
}

export default Photo;
