import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import styles from "./ClientCreate.module.css";
import inputs from "../../styles/inputs.module.css";
const VITE_URL_CLIENTS = import.meta.env.VITE_URL_CLIENTS;

export const ClientCreate = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setClient({
      name: "",
      phone: "",
      address: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(VITE_URL_CLIENTS, client);
      setLoading(false);
      alert(response.data.message);
      handleReset();
      navigate("/clients");
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert(error.response.data.message);
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.containerCreate}>
          <h2 style={{ color: "white", textAlign: "center" }}>
            CREAR CLIENTE NUEVO
          </h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={inputs.inputGroup}>
              <input
                type="text"
                name="name"
                id="name"
                className={inputs.inputGroupInput}
                onChange={handleChange}
                required
              />
              <label htmlFor="name" className={inputs.inputGroupLabel}>
                Nombre:
              </label>
            </div>
            <div className={inputs.inputGroup}>
              <input
                type="text"
                name="address"
                id="address"
                className={inputs.inputGroupInput}
                onChange={handleChange}
                required
              />
              <label htmlFor="address" className={inputs.inputGroupLabel}>
                Dirección:
              </label>
            </div>
            <div className={inputs.inputGroup}>
              <input
                type="text"
                name="phone"
                id="phone"
                className={inputs.inputGroupInput}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone" className={inputs.inputGroupLabel}>
                Teléfono:
              </label>
            </div>
          </form>
          <button onClick={handleSubmit}>CREAR</button>
          <button onClick={() => navigate("/clients")}>VOLVER</button>
        </div>
      )}
    </>
  );
};
