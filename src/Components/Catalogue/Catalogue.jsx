import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import { Login } from "../Login/Login";
import styles from "./Catalogue.module.css";
const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;

export const Catalogue = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(VITE_URL_PRODUCTS)
      .then((response) => setProducts(response.data));
    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  if (token === null || token?.length < 150) {
    return <Login />;
  } else {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.containerCatalogue}>
            <div className={styles.gridProducts}>
              {products &&
                products?.map((p) => {
                  return (
                    <div
                      key={p.product_id}
                      className={styles.cards}
                      onClick={() => navigate(`/detail/${p.product_id}`)}
                    >
                      <img src={p?.img} alt={p.name} />
                      <span>{p?.name.toUpperCase()}</span>
                    </div>
                  );
                })}
            </div>
            <button onClick={() => navigate("/products/create")}>+</button>
            <button onClick={() => navigate("/")}>VOLVER</button>
          </div>
        )}
      </>
    );
  }
};
