import canvasPhoto from "./canvasPhoto.png";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import videoCanvas from "./videoCanvas.mov";
import videoGallery from "./videoGallery.mov";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <section className="section">
        <div className="container">
          <div class="tile is-ancestor">
            <div class="tile is-12 is-parent">
              <div class="tile is-child box">
                <div className="columns">
                  <div className="column is-full">
                    <p class="title is-1 is-spaced">Draw</p>
                    <p class="subtitle is-3">a simple drawing app</p>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-two-thirds">
                    <Link to="/draw">
                      <img src={canvasPhoto} alt="screen shot" />
                    </Link>
                  </div>
                  <div className="column desc">
                    <p>
                      Draw is a simple drawing app built using the HTML canvas
                      element by Jennifer Law
                      <br />
                      <br />
                      Made with the requirements of mintbean's{" "}
                      <a href="https://mintbean.io/meets/cfa4fa54-c706-4c51-a04f-671f6686f9fd">
                        hackathon
                      </a>{" "}
                      in mind - using NodeJS, ReactJS, Express, and PostgreSQL
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tile is-ancestor">
            <div class="tile is-12 is-parent">
              <div class="tile is-child box">
                <div className="columns">
                  <div className="column desc">
                    <p>
                      <strong>Features:</strong>
                      <br />
                      <br />
                      <ol>
                        <ul>
                          <li>
                            ~ Free-draw lines, straight lines, and rectangles -
                            essential tools to draw!
                          </li>
                          <li>
                            ~ Colour picker and brush width - adjust according
                            to your needs!
                          </li>
                          <li>
                            ~ Select, move, and fill - essential tools to make
                            changes!
                          </li>
                          <li>
                            ~ Delete and clear - delete a selected stroke, or
                            clear the page!
                          </li>
                          <li>~ Post - post your art to the Gallery!</li>
                        </ul>
                      </ol>
                    </p>
                  </div>
                  <div className="column is-two-thirds">
                    <video controls autoPlay loop muted>
                      <source src={videoCanvas} type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tile is-ancestor">
            <div class="tile is-12 is-parent">
              <div class="tile is-child box">
                <div className="columns">
                  <div className="column is-two-thirds">
                    <video controls autoPlay loop muted>
                      <source src={videoGallery} type="video/mp4" />
                    </video>
                  </div>
                  <div className="column desc">
                    <p>
                      <strong>Gallery:</strong>
                      <br />
                      <br />
                      <ol>
                        <ul>
                          <li>~ Browse your drawings in the Gallery!</li>
                          <li>
                            ~ View your art individually by clicking view!
                          </li>
                          <li>~ Edit the title and description of your art!</li>
                          <li>~ Delete old drawings by clicking delete!</li>
                          <li>~ The Gallery can display up to 6 drawings!</li>
                        </ul>
                      </ol>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
