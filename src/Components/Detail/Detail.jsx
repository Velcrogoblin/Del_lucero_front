import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { Login } from "../Login/Login";
import axios from "axios";
import styles from "../Detail/Detail.module.css";
const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;

export const Detail = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [price, setPrice] = useState();
  const { id } = useParams();

  const getPrice = () => {
    let price = 0;
    detail.Supplies.map((s) =>
      s.name === "cera"
        ? (price += Math.round(s.cost * (detail.weight / 1000)))
        : (price += s.cost)
    );
    setPrice(price);
  };

  useEffect(() => {
    try {
      axios
        .get(`${VITE_URL_PRODUCTS}id/${id}`)
        .then((response) => setDetail(response.data))
        .then(() => setLoading(false));

      setToken(JSON.parse(window.localStorage.getItem("token")));
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    detail !== undefined && getPrice();
  }, [detail]);

  if (token === null || token?.length < 150) {
    return <Login />;
  } else {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.containerDetail}>
            {detail && (
              <div className={styles.detailVela}>
                <h2>{detail.name.toUpperCase()}</h2>
                <img src={detail.img} alt="" />
                <h2 key={detail.product_id}>
                  ${price * detail.earning_percentage}
                </h2>
                <span>ANCHO: {detail.width} cm</span>
                <span>ALTO: {detail.height} cm</span>
                <span>PESO: {detail.weight} gr</span>
                <span>DURACIÓN: {detail.duration} hs</span>
                <button onClick={() => navigate(`/products/edit/${id}`)}>
                  EDITAR
                </button>
                <button onClick={() => navigate("/catalogue")}>VOLVER</button>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
};
