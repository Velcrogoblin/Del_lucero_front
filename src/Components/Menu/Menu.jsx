import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import productIcon from "../../Image/icono_productos.png";
import supplyIcon from "../../Image/icono_insumos.png";
import ordersIcon from "../../Image/icono_pedidos.png";
import purchasesIcon from "../../Image/icono_ventas.png";
import clientsIcon from "../../Image/icono_clientes.png";
import expensesIcon from "../../Image/icono_gastos.png";
import suppliersIcon from "../../Image/icono_proveedores.png";

export const Menu = ({ setToken, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleExit = () => {
    window.localStorage.clear();
    setToken("");
    setIsLoggedIn(false);
    alert("Has salido de la app");
    navigate("/");
  };

  return (
    <div className={styles.containerMenu}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <img src={productIcon} onClick={() => navigate("/catalogue")} />
          PRODUCTOS
        </div>

        <div className={styles.menu}>
          <img src={supplyIcon} onClick={() => navigate("/supplies")} />
          INSUMOS
        </div>

        <div className={styles.menu}>
          <img src={ordersIcon} onClick={() => navigate("/orders")} />
          PEDIDOS
        </div>

        <div className={styles.menu}>
          <img src={purchasesIcon} onClick={() => navigate("/purchases")} />
          VENTAS
        </div>

        <div className={styles.menu}>
          <img src={clientsIcon} onClick={() => navigate("/clients")} />
          CLIENTES
        </div>

        <div className={styles.menu}>
          <img src={suppliersIcon} onClick={() => navigate("/providers")} />
          PROVEEDORES
        </div>

        <div className={styles.menu}>
          <img src={expensesIcon} onClick={() => navigate("/expenses")} />
          GASTOS
        </div>
      </div>
    </div>
  );
};
