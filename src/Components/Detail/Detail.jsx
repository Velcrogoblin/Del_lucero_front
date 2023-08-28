import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import style from "../../styles/buttons.module.css";
import styles from "../Detail/Detail.module.css";
const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;

export const Detail = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    try {
      axios
        .get(`${VITE_URL_PRODUCTS}id/${id}`)
        .then((response) => setDetail(response.data));
    } catch (error) {
      alert(error.message);
    }
  }, []);

  console.log(detail);

  return (
    <div className={styles.containerDetail}>
      {detail && (
        <div className={styles.detailVela}>
          <h2 className={styles.nameDetail}>{detail.name}</h2>
          <img className={styles.imageDetail} src={detail.img} alt="" />
          <h4 className={styles.infoDetail}>Precio: $ {detail.price}</h4>
          <h5 className={styles.infoDetail}>Ancho: {detail.width} cm</h5>
          <h5 className={styles.infoDetail}>Alto: {detail.height} cm</h5>
          <h5 className={styles.infoDetail}>Peso: {detail.weight} cm</h5>
          <h5 className={styles.infoDetail}>
            Vida util: {detail.duration} min
          </h5>
          <h5 className={styles.infoDetail}>
            Existencias: {detail.stock} unidades
          </h5>
          <button
            className={style.createButton}
            onClick={() => navigate("/catalogue")}
          >
            Volver
          </button>
        </div>
      )}
    </div>
  );
};
