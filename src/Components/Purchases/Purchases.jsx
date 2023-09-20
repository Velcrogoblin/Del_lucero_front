import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Purchases.module.css";
const VITE_URL_PURCHASES = import.meta.env.VITE_URL_PURCHASES;

export const PurchasesGrid = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);

  
  function compareDates(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
  
    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    const purch = axios
      .get(VITE_URL_PURCHASES)
      .then((res) => setPurchases(res.data.sort(compareDates)));
  }, []);

  return (
    <div className={styles.containerPurchases}>
      <div className={styles.gridPurchases}>
        {purchases &&
          purchases.map((p) => (
            <div key={p.purchase_id} className={styles.cards}>
              <h3>{p.Client.name.toUpperCase()}</h3>
              <p>{`${new Date(p.date).getUTCDate()} / ${
                new Date(p.date).getUTCMonth() + 1
              }`}</p>
              <h4>${p.total_amount}</h4>
            </div>
          ))}
      </div>
      <button onClick={() => navigate("/")}>VOLVER</button>
    </div>
  );
};
