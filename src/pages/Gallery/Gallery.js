import { useEffect, useState } from "react";
import axios from "axios";
import "./Gallery.css";
import Footer from "../../components/Footer/Footer";

//Card component
const Card = ({ id, name, desc, img, setView, setRefresh, setUpdate }) => {
  //delete 1 drawing
  const handleDelete = (id) => {
    axios.delete(`/api/drawing/${id}`).then((res) => {
      setRefresh(true);
    });
  };

  return (
    <div className="card">
      <div className="card-content">
        <p className="title is-6">{name}</p>
        <div className="card-image has-text-centered">
          <img src={img} alt="drawing" />
        </div>
        <p className="content is-small">{desc}</p>
      </div>
      <div className="card">
        <footer className="card-footer has-background-light">
          <div>
            <button
              className="button is-small is-success is-light"
              onClick={() => setView(img)}
            >
              View
            </button>
            <button
              className="button is-small is-info is-light"
              onClick={() => setUpdate({ id, name, desc, img })}
            >
              Edit
            </button>
          </div>
          <button
            className="button is-small is-danger is-light"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
};

//Gallery component
const Gallery = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState(null);
  const [update, setUpdate] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    //get all drawings
    axios.get("/api/gallery").then((res) => {
      setData(res.data);
      setRefresh(false);
    });
  }, [refresh]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //update drawing
    axios
      .put(`/api/drawing/${update.id}`, {
        name: update.name,
        image: update.img,
        description: update.desc,
      })
      .then((res) => {
        setRefresh(true);
        setUpdate({});
      });
  };

  //form input
  const handleInput = (e) => {
    const newData = { ...update };
    newData[e.target.id] = e.target.value;
    setUpdate(newData);
  };

  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="content">
            <h2 class="title is-2">Gallery</h2>
            <div className="columns is-multiline">
              {data.map((pic, i) => {
                const { description, name, image, id } = pic;
                return (
                  <div className="column is-one-third" key={i}>
                    <Card
                      key={i}
                      id={id}
                      name={name}
                      desc={description}
                      img={image}
                      setView={setView}
                      setRefresh={setRefresh}
                      setUpdate={setUpdate}
                    />
                  </div>
                );
              })}
            </div>

            <div className={`modal ${view ? "is-active" : ""}`}>
              <div
                className="modal-background"
                onClick={() => {
                  setView(null);
                }}
              ></div>
              <div className="modal-content has-background-white py-5 px-5">
                <div className="content">
                  <img src={view} alt="drawing" />
                </div>
              </div>
            </div>
          </div>
          {/* repeat form from drawing - refactor */}
          <div
            className={`modal ${
              Object.keys(update).length !== 0 ? "is-active" : ""
            }`}
          >
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Edit Name and Description</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={() => {
                    setUpdate({});
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
                        value={update.name}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        placeholder="An art piece I created using this awesome app"
                        id="desc"
                        onChange={(e) => handleInput(e)}
                        value={update.desc}
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
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Gallery;
