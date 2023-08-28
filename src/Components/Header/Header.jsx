import React from "react";
import styles from "./Header.module.css";
import logo from "./logo/lucero2.jpeg";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.containerHeader}>
      <img
        className={styles.logoLucero}
        src={logo}
        alt="logo"
        onClick={() => navigate("/")}
      />
      <div className={styles.tittleApp}>Del Lucero</div>
    </div>
  );
};
