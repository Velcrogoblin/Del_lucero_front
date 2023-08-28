import React, { useEffect, useState } from "react";
import axios from "axios";
import buttons from "../../styles/buttons.module.css";
import tables from "../../styles/tables.module.css";
import containers from "../../styles/containers.module.css";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import lapiz from "../../Image/lapiz.png";
import caneca from "../../Image/delete.png";
import vela from "../../Image/vela.png";
const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;

export const ProductsGrid = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const handleActivate = async (product_id) => {
    setLoading(true);
    try {
      let res = await axios.put(
        `${VITE_URL_PRODUCTS}delete/${product_id}
      `,
        {
          token,
        }
      );
      console.log(res.data);
      setLoading(false);
      alert(res.data.message);

      setProducts(
        products.map((p) =>
          p.product_id === product_id && p.active === true
            ? { ...p, active: false }
            : { ...p, active: true }
        )
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Algo salió mal :(");
    }
  };

  useEffect(() => {
    const prod = axios
      .get(VITE_URL_PRODUCTS)
      .then((res) => setProducts(res.data))
      .then(setLoading(false));
    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={containers.tableContainer}>
          <table className={tables.mainTable}>
            <thead className={tables.tableHeader}>
              <tr className={tables.tableHeader}>
                <th className={tables.tableHeaderItem}>Nombre</th>
                <th className={tables.tableHeaderItem}>Editar</th>
                <th className={tables.tableHeaderItem}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((p) => (
                  <tr className={tables.tableRow} key={p.product_id}>
                    <td className={tables.tableItem}>{p.name}</td>
                    <td
                      className={tables.tableItem}
                      onClick={() => navigate(`/products/edit/${p.product_id}`)}
                    >
                      <img
                        className={buttons.buttonEdit}
                        src={lapiz}
                        alt="editar"
                      />
                    </td>
                    {p.active === false ? (
                      <td
                        className={tables.tableItem}
                        onClick={() => handleActivate(p.product_id)}
                      >
                        <img
                          className={buttons.buttonActive}
                          src={vela}
                          alt="active"
                        />
                      </td>
                    ) : (
                      <td
                        className={tables.tableItem}
                        onClick={() => handleActivate(p.product_id)}
                      >
                        <img
                          className={buttons.buttonActive}
                          src={caneca}
                          alt="delete"
                        />
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
          <div
            className={buttons.createButton}
            onClick={() => navigate("/products")}
          >
            Volver
          </div>
        </div>
      )}
    </div>
  );
};
