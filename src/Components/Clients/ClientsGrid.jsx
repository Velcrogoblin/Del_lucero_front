import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import styles from "./ClientsGrid.module.css";
const VITE_URL_CLIENTS = import.meta.env.VITE_URL_CLIENTS;

export const ClientsGrid = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const handleEdit = (client_id) => {
    navigate(`/clients/id/${client_id}`);
  };

  useEffect(() => {
    axios
      .get(VITE_URL_CLIENTS)
      .then((res) => setClient(res.data))
      .catch((err) => console.error(err));
    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.containerClients}>
          <div className={styles.gridClients}>
            {client &&
              client.map((c) => (
                <div
                  key={c.client_id}
                  className={styles.cards}
                  onClick={() => navigate(`/clients/id/${c.client_id}`)}
                >
                  <h3>{c.name.toUpperCase()}</h3>
                  <p>{c.phone}</p>
                  <p>{c.address}</p>
                </div>
              ))}
          </div>
          <button onClick={() => navigate("/clients/create")}>+</button>
          <button onClick={() => navigate("/")}>VOLVER</button>
        </div>
      )}
    </div>
  );
};
