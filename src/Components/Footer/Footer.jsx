import React from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";
export const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.containerFooter}>
      <h1 className={styles.testFooter}>Con cariño, de Nico</h1>
    </div>
  );
};
