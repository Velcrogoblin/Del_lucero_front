import { useState, useEffect }from "react";
import { useNavigate } from "react-router-dom";
import buttons from "../../styles/buttons.module.css";
import containers from "../../styles/containers.module.css";
import axios from "axios";
const VITE_URL_PROVIDERS = import.meta.env.VITE_URL_PROVIDERS;

export const Providers = () => {
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const prov = axios.get(VITE_URL_PROVIDERS)
    .then((res) => setProviders(res.data));
  }, []);

  return (
    <div className={containers.mainContainer}>
      <div
        onClick={() => navigate("/providers/create")}
        className={buttons.buttonMenu}
      >
        Nuevo Proveedor
      </div>
      
      {providers && providers.map((p) => (
        <div key = {p.name} onClick={() => navigate("/providers/edit")} className = {containers.order}>{p.name}</div>
      ))}
      <div onClick={() => navigate("/")} className={buttons.buttonMenu}>
        Volver
      </div>
    </div>
  );
};
