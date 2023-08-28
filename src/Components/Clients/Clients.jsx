import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./clients.module.css";
import buttons from "../../styles/buttons.module.css";
import containers from "../../styles/containers.module.css";

export const Clients = () => {
  const navigate = useNavigate();
  return (
    <div className={containers.mainContainer}>
      <div
        className={buttons.buttonMenu}
        onClick={() => navigate("/clients/create")}
      >
        Crear Cliente
      </div>
      <div
        className={buttons.buttonMenu}
        onClick={() => navigate("/clients/grid")}
      >
        Editar Cliente
      </div>
      <div onClick={() => navigate("/")} className={buttons.buttonMenu}>
        Volver
      </div>
    </div>
  );
};
