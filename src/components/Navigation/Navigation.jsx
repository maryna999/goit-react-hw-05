import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={s.navWrap}>
      <nav className={s.nav}>
        <NavLink className={s.navLink} to="/">
          Home
        </NavLink>
        <NavLink className={s.navLink} to="/movies">
          Movies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
