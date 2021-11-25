import "./Draw.css";
import Canvas from "../components/Canvas";
import {
  FaMousePointer,
  FaMinus,
  FaSquare,
  FaPaintBrush,
  FaFillDrip,
  FaTrash,
  FaStickyNote,
  FaImages,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

const Draw = () => {
  const [elementType, setElementType] = useState("brush");
  const [brushWidth, setBrushWidth] = useState(20);
  const [colour, setColour] = useState("black");
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("none"); //none, drawing, moving, remove, fill
  const [save, setSave] = useState(false);
  const [imgData, setImgData] = useState("");
  const [formData, setFormData] = useState({
    name: "Untitled",
    description: "",
  });
  const [posted, setPosted] = useState(false);
  const [warning, setWarning] = useState("");

  //window width < 754px - set toolbar to horizontal

  let toolbarWidth = "is-1";
  let toolbarAlignment = "is-vertical";

  if (false) {
    toolbarWidth = "is-12";
    toolbarAlignment = "";
  }

  useEffect(() => {
    setWarning("");
    axios.get("/api/gallery").then((res) => {
      if (res.data.length >= 6) {
        setWarning("Gallery is full, please delete a drawing before saving");
      }
    });
  }, [posted]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/drawing/new", {
        name: formData.name,
        image: imgData,
        description: formData.description,
      })
      .then((res) => {
        setPosted(true);
        setSave(false);
        setImgData("");
        setFormData({ name: "Untitled", description: "" });
      });
  };

  const handleInput = (e) => {
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  };

  return (
    <section className="section" id="draw-section">
      <div className="container">
        <div class={`tile is-ancestor ${warning ? "" : "is-hidden"}`}>
          <div class="tile is-parent is-12">
            <div class="tile is-child notification is-warning">{warning}</div>
          </div>
        </div>
        <div className="tile is-ancestor">
          <div className={`tile ${toolbarWidth} ${toolbarAlignment} is-parent`}>
            <div className="tile is-child">
              <button
                className="button"
                onClick={() => {
                  setAction("none");
                  setElementType("brush");
                }}
              >
                <span className="icon is-small">
                  <FaPaintBrush />
                </span>
              </button>
              <button
                className="button"
                onClick={() => {
                  setAction("none");
                  setElementType("line");
                }}
              >
                <span className="icon is-small">
                  <FaMinus />
                </span>
              </button>

              <button
                className="button"
                onClick={() => {
                  setAction("none");
                  setElementType("rect");
                }}
              >
                <span className="icon is-small">
                  <FaSquare />
                </span>
              </button>

              <button
                className="button"
                onClick={() => {
                  setAction("none");
                  setElementType("select");
                }}
              >
                <span className="icon is-small">
                  <FaMousePointer />
                </span>
              </button>

              <button
                className="button"
                onClick={() => {
                  setElementType("select");
                  setAction("fill");
                }}
              >
                <span className="icon is-small">
                  <FaFillDrip />
                </span>
              </button>

              <button
                className="button"
                onClick={() => {
                  setElementType("select");
                  setAction("remove");
                }}
              >
                <span className="icon is-small">
                  <FaTrash />
                </span>
              </button>

              <button
                className="button is-danger is-outlined"
                onClick={() => {
                  setAction("none");
                  if (elements.length !== 0) {
                    setElementType("clear");
                    setElements([]);
                  }
                }}
              >
                <span className="icon is-small">
                  <FaStickyNote />
                </span>
              </button>
            </div>
            <div className="tile is-child">
              <article className="save-button">
                <button
                  className="button is-link is-outlined"
                  onClick={() => setSave(true)}
                  disabled={warning}
                >
                  <span className="icon">
                    <FaImages />
                  </span>
                </button>
              </article>
            </div>
          </div>
          <div className="tile is-11 is-vertical">
            <div className="tile is-parent">
              <div className="tile is-child">
                <input
                  type="color"
                  id="color"
                  onChange={(e) => setColour(e.target.value)}
                />
                <input
                  type="range"
                  min="1"
                  max="20"
                  className="brush-size"
                  onChange={(e) => setBrushWidth(e.target.value)}
                ></input>
              </div>
              <div id="right-align">
                <label>Colour: </label>
                {colour}
                <label>Brush Width: </label>
                {brushWidth}
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child">
                <Canvas
                  elements={elements}
                  setElements={setElements}
                  elementType={elementType}
                  colour={colour}
                  brushWidth={brushWidth}
                  action={action}
                  setAction={setAction}
                  save={save}
                  setImgData={setImgData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal ${save ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Post to Gallery</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                setImgData("");
                setSave(false);
              }}
            ></button>
          </header>
          <form onSubmit={(e) => handleSubmit(e)}>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Art Piece 1"
                    id="name"
                    onChange={(e) => handleInput(e)}
                    value={formData.name}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="An art piece I created using this awesome app"
                    id="description"
                    onChange={(e) => handleInput(e)}
                    value={formData.description}
                  ></textarea>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" type="submit">
                Save drawing
              </button>
            </footer>
          </form>
        </div>
      </div>

      <div className={`modal ${posted ? "is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={() => setPosted(false)}
        ></div>
        <div className="modal-content has-background-white py-5 px-5">
          <div className="content">
            <h3>Posted!</h3>
            <p>
              You can view your drawing in the Gallery or continue to draw on
              this page
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Draw;
