import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import style from "./Wrapper.module.css";

export const Wrapper = () => {
  return (
    <>
      <Header />
      <div className={style.appBodyOutlet}>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};
