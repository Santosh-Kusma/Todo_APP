import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/auth/auth.thunk";
import style from "./Navbar.module.css";

export function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={style.layout}>
      <nav className={style.nav}>
        <h3 className={style.title}>Todo</h3>

        <div className={style.actions}>
          {!isAuthenticated ? (
            <Link to="/login">Login</Link>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
