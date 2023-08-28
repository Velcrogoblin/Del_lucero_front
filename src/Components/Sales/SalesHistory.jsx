import React from "react";
import { useNavigate } from "react-router-dom";
import buttons from "../../styles/buttons.module.css";

export const SalesHistory = () => {
  const navigate = useNavigate();
  return (
    <div>
      SalesHistory
      <div onClick={() => navigate("/")} className={buttons.buttonMenu}>
        Volver
      </div>
    </div>
  );
};
