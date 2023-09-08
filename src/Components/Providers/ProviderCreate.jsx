import React, { useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import style from "./providerCreate.module.css";
import buttons from "../../styles/buttons.module.css";
import inputs from "../../styles/inputs.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const VITE_URL_PROVIDERS = import.meta.env.VITE_URL_PROVIDERS;

export const ProviderCreate = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [provider, setProvider] = useState({
    name: "",
    phone: "",
    address: "",
    website: "",
    supplies_name: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "supplies_name") {
      setProvider({ ...provider, supplies_name: [e.target.value] });
    } else {
      setProvider({ ...provider, [e.target.name]: e.target.value });
    }
  };

  const handleReset = () => {
    setProvider({
      name: "",
      phone: "",
      address: "",
      website: "",
      supplies_name: [],
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const response = await axios.post(VITE_URL_PROVIDERS, {
        ...provider,
        token,
      });
      setLoading(false);
      alert(response.data.message);

      navigate("/providers");
    } catch (error) {
      setLoading(false);

      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  return (
    <>
      <h3 style={{ color: "white", textAlign: "center" }}>
        Crear proveedor nuevo
      </h3>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.mainForm}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <br />
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
                Teléfono
              </label>
            </div>
            <div className={inputs.inputGroup}>
              <input
                type="text"
                name="website"
                id="website"
                className={inputs.inputGroupInput}
                onChange={handleChange}
                required
              />
              <label htmlFor="website" className={inputs.inputGroupLabel}>
                Página web{" "}
              </label>
            </div>
            <div className={inputs.inputGroup}>
              <input
                type="text"
                name="supplies_name"
                id="supplies"
                className={inputs.inputGroupInput}
                onChange={handleChange}
                required
              />
              <label htmlFor="supplies_name" className={inputs.inputGroupLabel}>
                Insumos
              </label>
            </div>
            <div
              className={buttons.createButton}
              onClick={() => handleSubmit()}
            >
              Agendar
            </div>
            <div
              type="button"
              className={buttons.createButton}
              onClick={() => navigate("/providers")}
            >
              Volver
            </div>
          </form>
        </div>
      )}
    </>
  );
};
