import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Draw</strong> created by Jennifer Law
          <br />
          <br />
          <span className="footer-icon">
            <a href="https://www.linkedin.com/in/jennifer-law-6991a04a/">
              <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
            </a>
          </span>
          <span className="footer-icon">
            <a href="https://github.com/jenlaw266">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
