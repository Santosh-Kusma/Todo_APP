import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/auth/auth.thunk";
import { clearAuthError } from "../store/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [redirectTimer, setRedirectTimer] = useState(null);

  useEffect(() => {
    dispatch(clearAuthError());

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [dispatch, redirectTimer]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setValidation("Name is required");
      return;
    }
    if (!email.trim()) {
      setValidation("Email is required");
      return;
    }
    if (!password.trim()) {
      setValidation("Password is required");
      return;
    }

    setValidation("");

    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        setSuccessMessage("You’re registered. Now you can log in");
        const timer = setTimeout(() => {
          navigate("/login");
        }, 3000);
        setRedirectTimer(timer);
      });
  };

  return (
    <div className={styles.authDiv}>
      <h2>Register</h2>

      {validation && <p className={styles.errorText}>{validation}</p>}
      {error && <p className = {styles.errorText}>{error}</p>}
      {successMessage && <p className = {styles.successText}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setValidation("");
            }}
          />
        </div>
        <div>
          <input
            placeholder="Email"
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            value={email}
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
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
      <div className={styles.link}>
        <Link to="/login">Already have account?login</Link>
      </div>
    </div>
  );
}
