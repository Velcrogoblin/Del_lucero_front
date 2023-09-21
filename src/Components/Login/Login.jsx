import { useState } from "react";
import axios from "axios";
import inputs from "../../styles/inputs.module.css";
import buttons from "../../styles/buttons.module.css";
import containers from "../../styles/containers.module.css";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { Link } from "react-router-dom";
const VITE_URL_AUTH = import.meta.env.VITE_URL_AUTH;

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [toke, setToken] = useState();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleReset = () => {
    setUser({
      username: "",
      password: "",
    });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const response = await axios.post(`${VITE_URL_AUTH}login`, user);
      alert("Ingreso exitoso");
      window.localStorage.setItem("token", JSON.stringify(response.data.token));
      setToken(response.data.token);
      location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.containerCreate}>
          <h2>INICIAR SESIÓN</h2>
            <form>
              <div className={inputs.inputGroup}>
            <label htmlFor="username" className={inputs.inputGroupLabel}>
              Nombre de usuario:
            </label>
            <input
              name="username"
              value={user.username}
              onChange={handleChange}
              className={inputs.inputGroupInput}
              required
            />
          </div>
          <div className={inputs.inputGroup}>
            <label htmlFor="password" className={inputs.inputGroupLabel}>
              Contraseña:
            </label>
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              className={inputs.inputGroupInput}
              required
            />
          </div>
        </form>
        <button onClick={() => handleSubmit()}>INGRESAR</button>
          </div>
      )}
    </div>
  );
};
