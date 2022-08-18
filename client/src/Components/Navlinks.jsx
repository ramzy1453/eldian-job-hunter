import links from "../Utils/links";
import { NavLink } from "react-router-dom";
export default function Navlinks(props) {
  return (
    <div className="nav-links">
      {links.map((link) => (
        <NavLink
          to={link.path}
          key={link.id}
          className={({ isActive }) =>
            !isActive ? "nav-link" : "nav-link active"
          }
        >
          <span className="icon">{link.icon}</span>
          {link.text}
        </NavLink>
      ))}
    </div>
  );
}
