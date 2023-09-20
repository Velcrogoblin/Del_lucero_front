import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Provider.module.css";
const VITE_URL_PROVIDERS = import.meta.env.VITE_URL_PROVIDERS;

export const Providers = () => {
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const prov = axios
      .get(VITE_URL_PROVIDERS)
      .then((res) => setProviders(res.data));
  }, []);

  return (
    <div className={styles.containerProviders}>
      <div className={styles.gridProviders}>
        {providers &&
          providers.map((p) => (
            <div
              key={p.name}
              onClick={() => navigate(`/providers/edit/${p.supplier_id}`)}
              className={styles.cards}
            >
              <h4>{p.name.toUpperCase()}</h4>
              <div>
                <p>INSUMOS</p>
                {p?.Supplies?.map((s) => {
                  return <h4 key={s.name}>{s.name}</h4>;
                })}
                <hr></hr>
              </div>
              <p>{p.phone}</p>
              <p>{p.address}</p>
              <p>{p.website}</p>
            </div>
          ))}
      </div>

      <button onClick={() => navigate("/providers/create")}>+</button>
      <button onClick={() => navigate("/")}>VOLVER</button>
    </div>
  );
};
