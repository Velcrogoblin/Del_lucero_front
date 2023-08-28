import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import deleteImage from "../../Image/delete.png";
import editImage from "../../Image/lapiz.png";
import axios from "axios";
import style from "./createclient.module.css";
import buttons from "../../styles/buttons.module.css";
import tables from "../../styles/tables.module.css";
import inputs from "../../styles/inputs.module.css";
import caneca from "../../Image/delete.png";
import onActive from "../../Image/on.png";
import { Loading } from "../Loading/Loading";
const VITE_URL_CLIENTS = import.meta.env.VITE_URL_CLIENTS;

export const ClientsGrid = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const handleActivate = async (client_id) => {
    setLoading(true);
    try {
      let res = await axios.put(`${VITE_URL_CLIENTS}delete/${client_id}`, {
        token,
      });
      setLoading(false);
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Algo salió mal :(");
    }
  };

  const handleEdit = (client_id) => {
    navigate(`/clients/id/${client_id}`);
  };

  useEffect(() => {
    axios
      .get(VITE_URL_CLIENTS)
      .then((resp) => setClient(resp.data))
      .catch((err) => console.error(err));
    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  return (
    <div className={style.searchClient}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h4 style={{ color: "white", textAlign: "center" }}>Clientes</h4>
          <table className={tables.mainTable}>
            <thead>
              <tr className={tables.tableRow}>
                <th className={tables.tableHeaderItem}>Nombre</th>
                <th className={tables.tableHeaderItem}>Editar</th>
                <th className={tables.tableHeaderItem}>Borrar</th>
              </tr>
            </thead>
            <tbody>
              {client &&
                client.map((c) => {
                  return (
                    <tr className={style.trBody} key={c.client_id}>
                      <td className={tables.tableItem}>{c.name}</td>
                      <td className={tables.tableItem}>
                        <img
                          onClick={() => handleEdit(c.client_id)}
                          style={{ height: "20px", width: "18px" }}
                          src={editImage}
                          alt={c.client_id}
                        />
                      </td>
                      {c.active === false ? (
                        <td
                          className={tables.tableItem}
                          onClick={() => handleActivate(c.client_id)}
                        >
                          <img
                            className={buttons.buttonActive}
                            src={onActive}
                            alt="active"
                          />
                        </td>
                      ) : (
                        <td
                          className={tables.tableItem}
                          onClick={() => handleActivate(c.client_id)}
                        >
                          <img
                            className={buttons.buttonActive}
                            src={caneca}
                            alt="delete"
                          />
                        </td>
                      )}
                      {/* <td className={style.tdBody}>
                    <img
                    onClick={(e) => handleDelete(e)}
                    style={{ height: "20px", width: "18px" }}
                    src={deleteImage}
                    alt={c.name}
                    />
                  </td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div
            type="button"
            className={buttons.createButton}
            onClick={() => navigate("/clients")}
          >
            Volver
          </div>
        </>
      )}
    </div>
  );
};
