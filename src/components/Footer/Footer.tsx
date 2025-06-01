import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <ul className="footer-container">
        <li className="active">
          <img src="../../src/assets/home_grey_icon.png" alt="Home" className="footer-icon" />
        </li>
        <li>
          <img src="../../src/assets/search_grey_icon.png" alt="Search" className="footer-icon" />
        </li>
        <li>
          <img src="../../src/assets/plus-button_icon_grey.png" alt="Add" className="footer-icon" />
        </li>
        <li>
          <img src="../../src/assets/copy_icon_grey.png" alt="Copy" className="footer-icon" />
        </li>
        <li>
          <img src="../../src/assets/image.png" alt="Profile" className="footer-icon" />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;