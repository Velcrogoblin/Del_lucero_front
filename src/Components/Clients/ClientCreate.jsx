import { useState } from "react";
import { Loading } from "../Loading/Loading";
import style from "./createclient.module.css";
import buttons from "../../styles/buttons.module.css";
import inputs from "../../styles/inputs.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      <h3 style={{ color: "white", textAlign: "center" }}>
        Crear cliente nuevo
      </h3>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.mainForm}>
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
                Nombre
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
                Direccion
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
                Telefono
              </label>
            </div>
            <div
              className={buttons.createButton}
              onClick={(e) => handleSubmit(e)}
            >
              Agendar
            </div>
            <div
              type="button"
              className={buttons.createButton}
              onClick={() => navigate("/clients")}
            >
              Volver
            </div>
          </form>
        </div>
      )}
    </>
  );
};
