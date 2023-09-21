import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../Login/Login";
import { Loading } from "../Loading/Loading";
import axios from "axios";
import styles from "./Provider.module.css";
const VITE_URL_PROVIDERS = import.meta.env.VITE_URL_PROVIDERS;

export const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const prov = axios
      .get(VITE_URL_PROVIDERS)
      .then((res) => setProviders(res.data));

    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  if (token === null || token?.length < 150) {
    return <Login />;
  } else {
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
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
        )}
      </div>
    );
  }
};
