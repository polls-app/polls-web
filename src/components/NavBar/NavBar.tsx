import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar-container">
        <ul className="navbar-list">
            <li>Hot</li>
            <li>Best</li>
            <li>Controversial</li>
        </ul>
    </nav>
  );
};

export default NavBar