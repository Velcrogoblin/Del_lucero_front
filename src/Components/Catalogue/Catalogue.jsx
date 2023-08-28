import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Catalogue.module.css";
import { useNavigate } from "react-router-dom";
import buttons from "../../styles/buttons.module.css";
const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;

export const Catalogue = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(VITE_URL_PRODUCTS).then((response) => setProducts(response.data));
  }, []);

  console.log(products);

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
                <img
                  className={styles.imageProduct}
                  src={p?.img}
                  alt={p.name}
                />
                <span className={styles.cardName}>{p?.name}</span>
              </div>
            );
          })}
      </div>
      <div onClick={() => navigate("/")} className={buttons.createButton}>
        Volver
      </div>
    </div>
  );
};
