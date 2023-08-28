import React from "react";
import loadingGif from "./loading.gif";
import containers from "../../styles/containers.module.css";

export const Loading = () => {
  return (
    <div className={containers.loadingContainer}>
      <img src={loadingGif} alt="loading" />
    </div>
  );
};
