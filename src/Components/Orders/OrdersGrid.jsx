import React, { useEffect, useState } from "react";
import axios from "axios";
import buttons from "../../styles/buttons.module.css";
import containers from "../../styles/containers.module.css";
import { useNavigate } from "react-router-dom";
const VITE_URL_ORDERS = import.meta.env.VITE_URL_ORDERS;

export const OrdersGrid = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const ord = axios.get(VITE_URL_ORDERS).then((res) => setOrders(res.data));
  }, []);

  return (
    <div className={containers.ordersContainer}>
      <div
        className={buttons.buttonMenu}
        onClick={() => navigate("/orders/create")}
      >
        Crear pedido
      </div>
      <div className={containers.ordersContainerNew}>
        {orders &&
          orders.map((o) => (
            <div
              key={o.order_id}
              className={containers.order}
              onClick={() => navigate(`/orders/edit/${o.order_id}`)}
            >
              <p>{o.Client.name}</p>
              <p>{`${new Date(o.delivery_date).getUTCDate()} / ${
                new Date(o.delivery_date).getUTCMonth() + 1
              }`}</p>
              <p>{o.status}</p>
              <p>${o.total_amount}</p>
              <p>{o.paid === false ? "No pagó" : "Pagado"}</p>
            </div>
          ))}
      </div>
      <div onClick={() => navigate("/")} className={buttons.buttonMenu}>
        Volver
      </div>
    </div>
  );
};
