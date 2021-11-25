import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Draw</strong> created by Jennifer Law
          <br />
          <br />
          <span class="footer-icon">
            <a href="https://www.linkedin.com/in/jennifer-law-6991a04a/">
              <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
            </a>
          </span>
          <span class="footer-icon">
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
