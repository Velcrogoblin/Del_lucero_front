import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { Login } from "../Login/Login";
import axios from "axios";
import styles from "./Supplies.module.css";
const VITE_URL_SUPPLIES = import.meta.env.VITE_URL_SUPPLIES;

export const Supplies = () => {
  const navigate = useNavigate();
  const [supplies, setSupplies] = useState();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    let response = axios
      .get(VITE_URL_SUPPLIES)
      .then((res) => setSupplies(res.data));

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
          <div className={styles.containerSupplies}>
            <div className={styles.gridSupplies}>
              {supplies &&
                supplies.map((s) => (
                  <div
                    key={s.supply_id}
                    className={styles.cards}
                    onClick={() => navigate(`/supplies/edit/${s.supply_id}`)}
                  >
                    <p>{s.name.toUpperCase()}</p>
                    <p>${s.cost}</p>
                  </div>
                ))}
            </div>
            <button onClick={() => navigate("/supplies/create")}>+</button>
            <button onClick={() => navigate("/")}>VOLVER</button>
          </div>
        )}
      </div>
    );
  }
};
