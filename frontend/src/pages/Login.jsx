import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/auth/auth.thunk";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearAuthError } from "../store/auth/auth.slice";
import styles from "./Auth.module.css"

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setValidation("Email is required");
      return;
    }
    if (!password.trim()) {
      setValidation("Password is required");
      return;
    }

    setValidation("");
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className={styles.authDiv}>
      <h2>Login</h2>

      {validation && <p className={styles.errorText}>{validation}</p>}
      {error && <p className={styles.errorText}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Email"
            value={email}
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            onChange={(e) => {
              setEmail(e.target.value);
              setValidation("");
            }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            minLength={4}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValidation("");
            }}
          />
        </div>
        <div>
          <button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
      <div className={styles.link}>
        <Link to="/register">Don't have account? register</Link>
      </div>
    </div>
  );
}
