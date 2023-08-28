import React, { useEffect, useState } from "react";
import axios from "axios";
import buttons from "../../styles/buttons.module.css";
import tables from "../../styles/tables.module.css";
import containers from "../../styles/containers.module.css";
import { useNavigate } from "react-router-dom";
import lapiz from "../../Image/lapiz.png";
const VITE_URL_ORDERS = import.meta.env.VITE_URL_ORDERS;

export const OrdersGrid = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const ord = axios.get(VITE_URL_ORDERS).then((res) => setOrders(res.data));
  }, []);

  return (
    <div className={containers.ordersContainer}>
      <table className={tables.orderTable}>
        <thead className={tables.tableHeader}>
          <tr className={tables.tableHeader}>
            <th className={tables.tableHeaderItem}>Nombre</th>
            <th className={tables.tableHeaderItem}>Estado</th>
            <th className={tables.tableHeaderItem}>Fecha de Entrega</th>
            <th className={tables.tableHeaderItem}>Editar</th>
            {/* <th className={tables.tableHeaderItem}>Borrar</th> */}
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((o) => (
              <tr key={o.order_id}>
                <td className={tables.tableItem}>{o.Client.name}</td>
                <td className={tables.tableItem}>{o.status}</td>
                <td className={tables.tableItem}>
                  {`${new Date(o.delivery_date).getUTCDate()} / ${
                    new Date(o.delivery_date).getUTCMonth() + 1
                  }`}
                </td>
                <td
                  className={tables.tableItem}
                  onClick={() => navigate(`/orders/edit/${o.order_id}`)}
                >
                  <img
                    className={buttons.buttonEdit}
                    src={lapiz}
                    alt="editar"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={buttons.createButton} onClick={() => navigate("/orders")}>
        Volver
      </div>
    </div>
  );
};
