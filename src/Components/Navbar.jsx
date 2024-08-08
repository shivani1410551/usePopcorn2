import { useRef } from "react";
import { useEffect } from "react";
const Navbar = ({ query, setQuery }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        ref={inputRef}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="num-results">
        {/* Found <strong>{movies.length}</strong> results */}
      </p>
    </nav>
  );
};

export default Navbar;
