import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-lime-950 p-5 text-neutral-50 uppercase flex justify-between items-center">
      <Link className="flex items-center gap-3" to="/">
        <img className="h-14" src="../vargladspexarna-logo.png" alt="Logo" />
        <p className="hover:underline">Hem</p>
      </Link>
      <div className="flex gap-5">
        <Link className="hover:underline" to="/allProductions">
          Alla spex
        </Link>
        <Link className="hover:underline" to="/scenisar">
          Scenisar
        </Link>
        <Link className="hover:underline" to="/scenplannerare/:playId">
          Scenplannerare
        </Link>
      </div>
    </nav>
  );
};
