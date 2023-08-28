import React from "react";
import { useNavigate } from "react-router-dom";
import buttons from "../../styles/buttons.module.css";
import containers from "../../styles/containers.module.css";

export const Orders = () => {
  const navigate = useNavigate();
  return (
    <div className={containers.mainContainer}>
      <div
        className={buttons.buttonMenu}
        onClick={() => navigate("/orders/create")}
      >
        Crear pedido
      </div>
      <div
        onClick={() => navigate("/orders/grid")}
        className={buttons.buttonMenu}
      >
        Editar pedido
      </div>
      <div onClick={() => navigate("/")} className={buttons.buttonMenu}>
        Volver
      </div>
    </div>
  );
};
