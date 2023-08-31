import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
//import buttons from "../../styles/buttons.module.css";
import containers from "../../styles/containers.module.css";
import { Loading } from "../Loading/Loading";
import { ClientsGrid } from "./ClientsGrid";
const VITE_URL_CLIENTS = import.meta.env.VITE_URL_CLIENTS;
export const Clients = () => {
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState();

  useEffect(() => {
    axios
      .get(VITE_URL_CLIENTS)
      .then((res) => setClientes(res.data))
      .then(setLoading(false));
  }, []);

  return (
    <div className={containers.mainContainer}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ClientsGrid clientes={clientes} />
        </>
      )}
    </div>
  );
};
