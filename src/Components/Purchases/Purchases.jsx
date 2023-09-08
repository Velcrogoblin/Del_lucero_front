import React, { useEffect, useState } from "react";
import axios from "axios";
import buttons from "../../styles/buttons.module.css";
import containers from "../../styles/containers.module.css";
import { useNavigate } from "react-router-dom";
const VITE_URL_PURCHASES = import.meta.env.VITE_URL_PURCHASES;

export const PurchasesGrid = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
 
  useEffect(() => {
    const purch = axios.get(VITE_URL_PURCHASES).then((res) => setPurchases(res.data));
  }, []);

  return (
    <div className={containers.ordersContainer}>
      <div className={containers.ordersContainerNew}>
        {purchases &&
          purchases.map((p) => (
            <div
              key={p.purchase_id}
              className={containers.order}
            >
              <p>{p.Client.name}</p>
              <p>{`${new Date(p.date).getUTCDate()} / ${
                new Date(p.date).getUTCMonth() + 1
              }`}</p>
              <p>${p.total_amount}</p>
            </div>
          ))}
      </div>
      <div onClick={() => navigate("/")} className={buttons.buttonMenu}>
        Volver
      </div>
    </div>
  );
};