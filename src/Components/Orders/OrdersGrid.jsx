import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { Login } from "../Login/Login";
import axios from "axios";
import styles from "./OrdersGrid.module.css";
const VITE_URL_ORDERS = import.meta.env.VITE_URL_ORDERS;

function compareDates(a, b) {
  const dateA = new Date(a.delivery_date);
  const dateB = new Date(b.delivery_date);

  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
  return 0;
}

export const OrdersGrid = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    axios
      .get(VITE_URL_ORDERS)
      .then((res) => setOrders(res.data.sort(compareDates)));
    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  if (token === null || token?.length < 150) {
    return <Login />;
  } else {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.containerOrders}>
            <div className={styles.gridOrders}>
              {orders &&
                orders.map(
                  (o) =>
                    o.active === true && (
                      <div
                        key={o.order_id}
                        className={styles.cards}
                        onClick={() => navigate(`/orders/edit/${o.order_id}`)}
                      >
                        <h3>{o.Client.name.toUpperCase()}</h3>
                        <p>{`${new Date(o.delivery_date).getUTCDate()} / ${
                          new Date(o.delivery_date).getUTCMonth() + 1
                        }`}</p>
                        <p>{o.status}</p>
                        <p>{o.paid === false ? "No pagó" : "Pagado"}</p>
                        <h4>${o.total_amount}</h4>
                      </div>
                    )
                )}
            </div>
            <button onClick={() => navigate("/orders/create")}>+</button>
            <button onClick={() => navigate("/")}>VOLVER</button>
          </div>
        )}
        ;
      </>
    );
  }
};
