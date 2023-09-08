import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import style from "../../styles/buttons.module.css";
import styles from "../Detail/Detail.module.css";
const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;
const VITE_URL_SUPPLIES = import.meta.env.VITE_URL_SUPPLIES;


export const Detail = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState();
  const [supplies, setSupplies] = useState ();
  const { id } = useParams();

  useEffect(() => {
    try {
      axios
        .get(`${VITE_URL_PRODUCTS}id/${id}`)
        .then((response) => setDetail(response.data));

        axios
          .get(VITE_URL_SUPPLIES)
          .then((res) => setSupplies(res.data));
    } catch (error) {
      alert(error.message);
    }
  }, []);



  return (
    <div className={styles.containerDetail}>
      {detail && (
        <div className={styles.detailVela}>
          <h2 className={styles.nameDetail}>{detail.name}</h2>
          <img className={styles.imageDetail} src={detail.img} alt="" />
          {supplies?.map((s) => s.name === "cera" && (
            <h4 key={detail.product_id} className={styles.infoDetail}>Precio: $ {s.cost * (detail.weight / 1000) * detail.earning_percentage}</h4>
          ) )}
          <h5 className={styles.infoDetail}>Ancho: {detail.width}cm</h5>
          <h5 className={styles.infoDetail}>Alto: {detail.height}cm</h5>
          <h5 className={styles.infoDetail}>Peso: {detail.weight}gr</h5>
          <h5 className={styles.infoDetail}>
            Duración: {detail.duration} min
          </h5>
          <button
            className={style.createButton}
            onClick={() => navigate(`/products/edit/${id}`)}
          >
            Editar
          </button>
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
