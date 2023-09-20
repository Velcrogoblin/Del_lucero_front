import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Catalogue.module.css";
const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;

export const Catalogue = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(VITE_URL_PRODUCTS).then((response) => setProducts(response.data));
  }, []);

  return (
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
  );
};
