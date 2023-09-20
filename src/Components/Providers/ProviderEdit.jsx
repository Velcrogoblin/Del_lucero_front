import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import inputs from "../../styles/inputs.module.css";
import styles from "./ProviderEdit.module.css";
const VITE_URL_PROVIDERS = import.meta.env.VITE_URL_PROVIDERS;
const VITE_URL_SUPPLIES = import.meta.env.VITE_URL_SUPPLIES;

export const ProviderEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setProvider({ ...provider, [e.target.name]: e.target.value });
  };

  const handleAddSupply = (e) => {
    setProvider({
      ...provider,
      Supplies: [...provider.Supplies, e.target.value]
    });
  };

  const handleRemoveSupply = (e) => {
    setProvider({
      ...provider,
      Supplies: provider.Supplies.filter((s) => s !== e.target.value),
    });
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

  const getProvider = async () => {
    let res = await axios.get(`${VITE_URL_PROVIDERS}id/${id}`);
    res.data.Supplies = res.data.Supplies.map((s) => s.name);
    setProvider(res.data);
  };

  useEffect(() => {
    getProvider();

    axios.get(VITE_URL_SUPPLIES).then((res) => setSupplies(res.data));
    setToken(JSON.parse(window.localStorage.getItem("token")));
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.containerEdit}>
          <h2>EDITAR PROVEEDOR</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Nombre:</label>
                <input
                  name="name"
                  value={provider.name}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Teléfono:</label>
                <input
                  name="phone"
                  value={provider.phone}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Dirección:</label>
                <input
                  name="address"
                  value={provider.address}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Página web:</label>
                <input
                  name="website"
                  value={provider.website}
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
                      const supplyAlreadyAdded = provider?.Supplies?.some(
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
              {provider?.Supplies?.length > 0 && (
                <div>
                  {provider?.Supplies?.map((s) => {
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
          <button onClick={() => handleSubmit()}>MODIFICAR</button>
          <button onClick={() => navigate("/providers")}>VOLVER</button>
        </div>
      )}
    </>
  );
};
