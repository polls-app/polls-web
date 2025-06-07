import "./Header.css";

interface HeaderProps {
  name?: string;
}

const Header = ({ name }: HeaderProps) => {
  return (
    <header className="app-header">
      <h1>{name ? name : "polls"}</h1>
      <button className="notification-button"></button>
    </header>
  );
};

export default Header;
