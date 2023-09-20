import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import styles from "./ProviderCreate.module.css";
import inputs from "../../styles/inputs.module.css";
const VITE_URL_PROVIDERS = import.meta.env.VITE_URL_PROVIDERS;
const VITE_URL_SUPPLIES = import.meta.env.VITE_URL_SUPPLIES;

export const ProviderCreate = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [supplies, setSupplies] = useState([]);
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

  const handleAddSupply = (e) => {
    setProvider({
      ...provider,
      supplies_name: [...provider.supplies_name, e.target.value],
    });
  };

  const handleRemoveSupply = (e) => {
    setProvider({
      ...provider,
      supplies_name: provider.supplies_name.filter((s) => s !== e.target.value),
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
    axios.get(VITE_URL_SUPPLIES).then((res) => setSupplies(res.data));
    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.containerCreate}>
          <h2>CREAR NUEVO PROVEEDOR</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Nombre:</label>
                <input
                  name="name"
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
              </div>

              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Dirección:</label>
                <input
                  name="address"
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Teléfono:</label>
                <input
                  name="phone"
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Página web:</label>
                <input
                  name="website"
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Insumos:</label>
                <select
                  className={inputs.inputGroupInput}
                  onChange={handleAddSupply}
                >
                  <option></option>
                  {supplies &&
                    supplies?.map((s) => {
                      const supplyAlreadyAdded = provider?.supplies_name?.some(
                        (supply) => s.name === supply
                      );
                      if (!supplyAlreadyAdded) {
                        return (
                          <option key={s.name} value={s.name}>
                            {s.name}
                          </option>
                        );
                      }
                    })}
                </select>
              </div>
              {provider?.supplies_name?.length > 0 && (
                <div>
                  {provider?.supplies_name?.map((s) => {
                    return (
                      <button
                        key={s}
                        type="button"
                        value={s}
                        style={{
                          color: "white",
                          backgroundColor: "rgb(254, 116, 98)",
                        }}
                        onClick={handleRemoveSupply}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </form>
          <button onClick={() => handleSubmit()}>CREAR</button>
          <button type="button" onClick={() => navigate("/providers")}>
            VOLVER
          </button>
        </div>
      )}
    </div>
  );
};
