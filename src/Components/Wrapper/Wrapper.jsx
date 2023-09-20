import React from "react";
import { Outlet } from "react-router-dom";
import style from "./Wrapper.module.css";

export const Wrapper = () => {
  return (
    <>
      <div className={style.appBodyOutlet}>
        <Outlet />
      </div>
    </>
  );
};
