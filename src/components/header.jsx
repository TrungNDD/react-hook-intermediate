import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="App-header">
      <ul class="list-none">
        <li>
          <Link to={"pokedex"}>Pokédex</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
