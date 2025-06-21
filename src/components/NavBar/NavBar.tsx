import "./NavBar.css";

interface NavBarProps {
  selected: string;
  onSelect: (sort: string) => void;
}

const NavBar = ({ selected, onSelect }: NavBarProps) => {
  return (
    <nav className="navbar-container">
      <ul className="navbar-list">
        <li onClick={() => onSelect("hot")} className={selected === "hot" ? "active" : ""}>Hot</li>
        <li onClick={() => onSelect("best")} className={selected === "best" ? "active" : ""}>Best</li>
        <li onClick={() => onSelect("controversial")} className={selected === "controversial" ? "active" : ""}>Controversial</li>
      </ul>
    </nav>
  );
};

export default NavBar;