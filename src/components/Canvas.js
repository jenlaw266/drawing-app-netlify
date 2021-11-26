import { useState, useRef, useEffect } from "react";
import "./Canvas.css";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const {
    elementType,
    colour,
    brushWidth,
    elements,
    setElements,
    action,
    setAction,
    save,
    setImgData,
  } = props;

  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.style.width = "100%";
    canvas.style.height = "70vh";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    context.beginPath();
    context.rect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "white";
    context.fill();

    context.lineCap = "round";

    elements.forEach((el) => {
      const type = el?.type;
      if (type === "line") {
        const { x1, y1, x2, y2, bColour, bWidth } = el;
        context.beginPath();
        context.strokeStyle = bColour;
        context.lineWidth = bWidth;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      } else if (type === "rect") {
        const { x1, y1, x2, y2, bColour, bWidth } = el;
        context.beginPath();
        context.strokeStyle = bColour;
        context.lineWidth = bWidth;
        context.rect(x1, y1, x2 - x1, y2 - y1);
        if (el.fColour) {
          context.fillStyle = el.fColour;
          context.fill();
        }
        context.stroke();
      } else if (type === "brush") {
        const { stroke, bColour, bWidth } = el;
        const initial = stroke[0];
        context.beginPath();
        context.moveTo(initial[0], initial[1]);
        context.strokeStyle = bColour;
        context.lineWidth = bWidth;
        for (const each of stroke) {
          context.lineTo(each[0], each[1]);
        }
        context.stroke();
        context.closePath();
      }
    });

    if (elementType === "clear") {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    if (save) {
      const dataURL = canvas.toDataURL("image/jpeg", 0.5);
      setImgData(dataURL);
    }

    contextRef.current = context;
  }, [elements, colour, brushWidth, elementType, save, setImgData]);

  const distance = (a, b) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

  const adjustElementCoords = (element) => {
    const { x1, y1, x2, y2, type } = element;
    if (type === "rect") {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      return { x1: minX, y1: minY, x2: maxX, y2: maxY };
    } else {
      if (x1 < x2 || (x1 === x2 && y1 < y2)) {
        return { x1, y1, x2, y2 };
      } else {
        return { x1: x2, y1: y2, x2: x1, y2: y1 };
      }
    }
  };

  const getElementAtPosition = (x, y, elements) => {
    return elements.find((element) => {
      const type = element?.type;
      if (type === "rect") {
        const { x1, y1, x2, y2 } = element;
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
      } else if (type === "line") {
        const { x1, y1, x2, y2 } = element;
        const a = { x: x1, y: y1 };
        const b = { x: x2, y: y2 };
        const c = { x, y };
        const offset = distance(a, b) - (distance(a, c) + distance(b, c));
        return Math.abs(offset) < 1;
      } else {
        const stroke = element?.stroke;
        const factor = 1;
        const array = [];

        for (let i = 0; i < stroke?.length - factor; i++) {
          const a = { x: stroke[i][0], y: stroke[i][1] };
          const b = { x: stroke[i + factor][0], y: stroke[i + factor][0] };
          const c = { x, y };
          const offset = distance(a, b) - (distance(a, c) + distance(b, c));
          array.push(Math.abs(offset) < 1);
        }
        for (const value of array) {
          if (value) return value;
        }
        return false;
      }
    });
  };

  const updateElement = (
    id,
    x1,
    y1,
    x2,
    y2,
    type,
    bColour,
    bWidth,
    fColour
  ) => {
    const updatedElement = {
      id,
      x1,
      y1,
      x2,
      y2,
      type,
      bColour,
      bWidth,
      fColour,
    };
    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy);
  };

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (elementType === "select") {
      const element = getElementAtPosition(offsetX, offsetY, elements);
      if (element) {
        if (action === "fill") {
          if (element.type === "rect") {
            const { id, x1, y1, x2, y2, type, bColour, bWidth } = element;
            updateElement(id, x1, y1, x2, y2, type, bColour, bWidth, colour);
          } else if (element.type === "line") {
            const { id, x1, y1, x2, y2, type, bWidth } = element;
            updateElement(id, x1, y1, x2, y2, type, colour, bWidth);
          } else {
            const { id, stroke, x1, y1, type, bWidth } = element;
            const newBrush = {
              id,
              stroke,
              x1,
              y1,
              type,
              bColour: colour,
              bWidth,
            };
            //need to refactor -repeating code
            const elementsCopy = [...elements];
            elementsCopy[id] = newBrush;
            setElements(elementsCopy);
          }
        } else if (action === "remove") {
          setElements((prev) => prev.filter((el) => el !== element));
        } else {
          setAction("moving");
          let elOffsetX;
          let elOffsetY;
          if (element.type !== "brush") {
            elOffsetX = offsetX - element.x1;
            elOffsetY = offsetY - element.y1;
          } else {
            elOffsetX = offsetX - element.x1 + element.stroke[0][0];
            elOffsetY = offsetY - element.y1 + element.stroke[0][1];
          }
          setSelectedElement({ ...element, elOffsetX, elOffsetY });
        }
      }
    } else {
      let id;
      if (elements.length > 0) {
        const lastIndex = elements.length - 1;
        id = elements[lastIndex].id + 1;
      } else {
        id = 0;
      }
      if (elementType === "line" || elementType === "rect") {
        const element = {
          id,
          x1: offsetX,
          y1: offsetY,
          x2: offsetX,
          y2: offsetY,
          type: elementType,
          bColour: colour,
          bWidth: brushWidth,
          fColour: null,
        };
        setElements((prev) => [...prev, element]);
      } else if (elementType === "brush") {
        const bStroke = {
          id,
          stroke: [[offsetX, offsetY]],
          x1: offsetX,
          y1: offsetY,
          type: elementType,
          bColour: colour,
          bWidth: brushWidth,
        };
        setElements((prev) => [...prev, bStroke]);
      }
      setAction("drawing");
    }
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    //mouse cursor
    if (elementType === "select") {
      e.target.style.cursor = "default";
      if (getElementAtPosition(offsetX, offsetY, elements)) {
        if (action === "fill" || action === "remove") {
          e.target.style.cursor = "pointer";
        } else {
          e.target.style.cursor = "move";
        }
      }
    }

    const index = elements.length - 1;

    if (action === "drawing") {
      if (elementType === "brush") {
        const { id, stroke, x1, y1, type, bColour, bWidth } = elements[index];
        const newStroke = [...stroke, [offsetX, offsetY]];
        const newBrush = {
          id,
          stroke: newStroke,
          x1,
          y1,
          type,
          bColour,
          bWidth,
        };
        //need to refactor -repeating code
        const elementsCopy = [...elements];
        elementsCopy[index] = newBrush;
        setElements(elementsCopy);
      } else if (elementType === "line" || elementType === "rect") {
        const { x1, y1, bColour, bWidth, fColour } = elements[index];

        updateElement(
          index,
          x1,
          y1,
          offsetX,
          offsetY,
          elementType,
          bColour,
          bWidth,
          fColour
        );
      }
    } else if (action === "moving") {
      if (selectedElement?.type !== "brush") {
        const {
          id,
          x1,
          x2,
          y1,
          y2,
          type,
          bColour,
          bWidth,
          fColour,
          elOffsetX,
          elOffsetY,
        } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = offsetX - elOffsetX;
        const newY1 = offsetY - elOffsetY;
        updateElement(
          id,
          newX1,
          newY1,
          newX1 + width,
          newY1 + height,
          type,
          bColour,
          bWidth,
          fColour
        );
      } else {
        const { id, stroke, type, bColour, bWidth, elOffsetX, elOffsetY } =
          selectedElement;

        const newStroke = stroke.map((each) => {
          return [each[0] + offsetX - elOffsetX, each[1] + offsetY - elOffsetY];
        });

        //need to refactor -repeating code
        const newBrush = {
          id,
          stroke: newStroke,
          x1: newStroke[0][0],
          y1: newStroke[0][1],
          type,
          bColour,
          bWidth,
        };
        const elementsCopy = [...elements];
        elementsCopy[id] = newBrush;
        setElements(elementsCopy);
      }
    }
  };

  const handleMouseUp = () => {
    const index = elements.length - 1;
    const type = elements[index]?.type;
    if (action === "drawing" && type !== "brush" && index >= 0) {
      const { id, bColour, bWidth, fColour } = elements[index];
      const { x1, y1, x2, y2 } = adjustElementCoords(elements[index]);
      updateElement(id, x1, y1, x2, y2, type, bColour, bWidth, fColour);
    }

    setAction((prev) => {
      if (prev === "fill" || prev === "remove") {
        return prev;
      } else {
        return "none";
      }
    });
    setSelectedElement(null);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Canvas;
