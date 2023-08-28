import React from "react";
import { useNavigate } from "react-router-dom";
import buttons from "../../styles/buttons.module.css";
import containers from "../../styles/containers.module.css";

export const Providers = () => {
  const navigate = useNavigate();
  return (
    <div className={containers.mainContainer}>
      <div
        onClick={() => navigate("/providers/create")}
        className={buttons.buttonMenu}
      >
        Nuevo Proveedor
      </div>
      <div
        onClick={() => navigate("/providers/edit")}
        className={buttons.buttonMenu}
      >
        Editar Proveedor
      </div>
      <div onClick={() => navigate("/")} className={buttons.buttonMenu}>
        Volver
      </div>
    </div>
  );
};
