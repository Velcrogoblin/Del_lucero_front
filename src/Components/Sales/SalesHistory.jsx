import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import buttons from "../../styles/buttons.module.css";
import axios from "axios";
import tables from "../../styles/tables.module.css";
import { Loading } from "../Loading/Loading";

const VITE_URL_PURCHASES = import.meta.env.VITE_URL_PURCHASES;

console.log(VITE_URL_PURCHASES);

export const SalesHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios
      .get(VITE_URL_PURCHASES)
      .then((res) => setPurchases(res.data))
      .then(() => setLoading(false));
  }, []);
  console.log(purchases);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          Historial de ventas
          <table className={tables.mainTable}>
            <thead>
              <tr className={tables.tableRow}>
                <th className={tables.tableHeaderItem}>Cliente</th>
                <th className={tables.tableHeaderItem}>Monto</th>
                <th className={tables.tableHeaderItem}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {purchases &&
                purchases.map((p) => {
                  return (
                    <tr>
                      <td>{p.Client.name}</td>
                      <td>{p.total_amount}</td>
                      <td>{p.date.slice(0, 10)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div onClick={() => navigate("/")} className={buttons.buttonMenu}>
            Volver
          </div>
        </>
      )}
    </>
  );
};
