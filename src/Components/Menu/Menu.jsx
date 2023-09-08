import React from "react";
import styles from "./Menu.module.css";
import buttons from "../../styles/buttons.module.css";
import { useNavigate } from "react-router-dom";

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
      <div className={styles.spacesMenu}>
        <div
          className={buttons.buttonMenu}
          onClick={() => navigate("/catalogue")}
        >
          Productos
        </div>
        <div
          className={buttons.buttonMenu}
          onClick={() => navigate("/supplies")}
        >
          Insumos
        </div>
        <div className={buttons.buttonMenu} onClick={() => navigate("/orders")}>
          Pedidos
        </div>
        <div
          className={buttons.buttonMenu}
          onClick={() => navigate("/purchases")}
        >
          Historial de ventas
        </div>
        <div
          className={buttons.buttonMenu}
          onClick={() => navigate("/clients")}
        >
          Clientes
        </div>
        <div
          className={buttons.buttonMenu}
          onClick={() => navigate("/providers")}
        >
          Proveedores
        </div>
        <div
          className={buttons.buttonMenu}
          onClick={() => navigate("/expenses")}
        >
          Gastos
        </div>
        <div className={buttons.buttonMenu} onClick={handleExit}>
          Salir
        </div>
      </div>
    </div>
  );
};
