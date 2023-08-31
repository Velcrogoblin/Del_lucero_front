import { useState } from "react";
import axios from "axios";
import inputs from "../../styles/inputs.module.css";
import buttons from "../../styles/buttons.module.css";
import containers from "../../styles/containers.module.css";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";
const VITE_URL_AUTH = import.meta.env.VITE_URL_AUTH;

export const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post(`${VITE_URL_AUTH}register/`, user);
      console.log(response);
      setLoading(false);

      alert("Registro exitoso");
      handleReset();
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <div className={containers.mainContainer}>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={inputs.inputGroup}>
            <label className={inputs.inputGroupLabel}>Nombre de usuario</label>
            <input
              name="username"
              value={user.username}
              onChange={handleChange}
              className={inputs.inputGroupInput}
            />
          </div>
          <div className={inputs.inputGroup}>
            <label className={inputs.inputGroupLabel}>Contraseña</label>
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              className={inputs.inputGroupInput}
            />
          </div>
          <div onClick={() => handleSubmit()} className={buttons.createButton}>
            Registrarse
          </div>
          <div onClick={handleReset} className={buttons.createButton}>
            Limpiar campos
          </div>
          <div onClick={() => navigate("/")} className={buttons.createButton}>
            Volver
          </div>
        </form>
      )}
    </div>
  );
};
