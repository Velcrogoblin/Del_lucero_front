import React from "react";
import { useNavigate } from "react-router-dom";
import buttons from "../../styles/buttons.module.css";
import containers from "../../styles/containers.module.css";

export const Products = () => {
  const navigate = useNavigate();
  return (
    <div className={containers.mainContainer}>
      <div
        onClick={() => navigate("/products/create")}
        className={buttons.buttonMenu}
      >
        Nuevo Producto
      </div>
      <div
        onClick={() => navigate("/products/grid")}
        className={buttons.buttonMenu}
      >
        Editar Producto{" "}
      </div>
      <div onClick={() => navigate("/")} className={buttons.buttonMenu}>
        Volver
      </div>
    </div>
  );
};
