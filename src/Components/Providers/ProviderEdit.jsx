import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import buttons from "../../styles/buttons.module.css";
import inputs from "../../styles/inputs.module.css";
import axios from "axios";
import { Loading } from "../Loading/Loading";
const VITE_URL_PROVIDERS = import.meta.env.VITE_URL_PROVIDERS;

export const ProviderEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState([]);
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setProvider({ ...provider, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (token.length < 150) {
      alert("Debes estar logueado para editar proveedores");
    } else {
      try {
        await axios.put(`${VITE_URL_PROVIDERS}`, {
          ...provider,
          token,
        });
        setLoading(false);
        alert("Proveedor editado");
        navigate("/providers");
      } catch (error) {
        setLoading(false);
        alert("Ocurrió un error");
      }
    }
  };


  useEffect(() => {
    axios
    .get(`${VITE_URL_PROVIDERS}id/${id}`)
    .then((res) => setProvider(res.data))
    .then(() => setLoading(false))
    setToken(JSON.parse(window.localStorage.getItem("token")));
  },[])


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h3 style={{ color: "white", textAlign: "center" }}>
            Editar proveedor
          </h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Nombre </label>
                <input
                  name="name"
                  value={provider.name}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Teléfono </label>
                <input
                  name="phone"
                  value={provider.phone}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Dirección </label>
                <input
                  name="address"
                  value={provider.address}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Página web </label>
                <input
                  name="website"
                  value={provider.website}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
            </div>

            <div
              onClick={() => handleSubmit()}
              className={buttons.createButton}
            >
              Modificar
            </div>
            <div
              className={buttons.createButton}
              onClick={() => navigate("/providers")}
            >
              Volver
            </div>
          </form>
        </>
      )}
    </>
  );
};


