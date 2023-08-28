import React, { useEffect, useState } from "react";
import inputs from "../../styles/inputs.module.css";
import buttons from "../../styles/buttons.module.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
const VITE_URL_PROVIDERS = import.meta.env.VITE_URL_PROVIDERS;

export const ProviderEdit = () => {
  const [provider, setProvider] = useState({ supplies: [] });
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.getItem("token");
    setToken(JSON.parse(window.localStorage.getItem("token")));
    axios
      .get(`${VITE_URL_PROVIDERS}id/${id}`)
      .then((res) => setProvider(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setProvider({ ...provider, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const response = await axios.put(VITE_URL_PROVIDERS, {
        ...provider,
        token,
      });
      alert(response.data.message);
      setLoading(false);
    } catch (error) {
      alert("no se actualizo el proveedor");
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <form>
            <div className={inputs.inputGroup}>
              <input
                type="text"
                name="name"
                value={provider.name}
                className={inputs.inputGroupInput}
                onChange={handleChange}
                required
              />
              <label className={inputs.inputGroupLabel}>Nombre</label>
            </div>
            <div className={inputs.inputGroup}>
              <input
                type="text"
                name="address"
                value={provider.address}
                className={inputs.inputGroupInput}
                onChange={handleChange}
                required
              />
              <label className={inputs.inputGroupLabel}>Direccion</label>
            </div>
            <div className={inputs.inputGroup}>
              <input
                type="text"
                name="phone"
                value={provider.phone}
                className={inputs.inputGroupInput}
                onChange={handleChange}
                required
              />
              <label className={inputs.inputGroupLabel}>Teléfono</label>
            </div>
            <div className={inputs.inputGroup}>
              <input
                type="text"
                name="website"
                value={provider.website}
                className={inputs.inputGroupInput}
                onChange={handleChange}
                required
              />
              <label className={inputs.inputGroupLabel}>Página web</label>
            </div>
            <div className={inputs.inputGroup}>
              <input
                type="text"
                name="supplies"
                value={provider.supplies.map((sup) => sup)}
                className={inputs.inputGroupInput}
                onChange={handleChange}
                required
              />
              <label className={inputs.inputGroupLabel}>Insumos</label>
            </div>
            <div
              className={buttons.createButton}
              onClick={(e) => handleSubmit(e)}
            >
              Editar Proveedor
            </div>
            <div
              type="button"
              className={buttons.createButton}
              onClick={() => navigate("/providers")}
            >
              Volver
            </div>
          </form>
        </>
      )}
    </div>
  );
};
