import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import { Login } from "../Login/Login";
import inputs from "../../styles/inputs.module.css";
import styles from "./ProductEdit.module.css";
const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;
const VITE_URL_SUPPLIES = import.meta.env.VITE_URL_SUPPLIES;

export const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();
  const [allSupplies, setAllSupplies] = useState([]);
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddSupply = (e) => {
    setProduct({ ...product, Supplies: [...product.Supplies, e.target.value] });
  };

  const handleRemoveSupply = (e) => {
    setProduct({
      ...product,
      Supplies: product.Supplies.filter((s) => s !== e.target.value),
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(`${VITE_URL_PRODUCTS}edit`, {
        ...product,
        token,
      });
      setLoading(false);
      alert("Producto editado");
      navigate("/catalogue");
    } catch (error) {
      setLoading(false);
      alert("Ocurrió un error");
    }
  };

  const getProduct = async () => {
    let res = await axios.get(`${VITE_URL_PRODUCTS}id/${id}`);
    res.data.Supplies = res.data.Supplies.map((s) => s.name);
    setProduct(res.data);
  };

  useEffect(() => {
    getProduct();

    axios
      .get(VITE_URL_SUPPLIES)
      .then((res) => setAllSupplies(res.data))
      .then(() => setLoading(false));
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
          <div className={styles.containerEdit}>
            <h2>EDITAR PRODUCTO</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className={inputs.inputGroup}>
                  <label className={inputs.inputGroupLabel}>Nombre:</label>
                  <input
                    name="name"
                    value={product?.name}
                    className={inputs.inputGroupInput}
                    onChange={handleChange}
                  />
                </div>
                <div className={inputs.inputGroup}>
                  <label className={inputs.inputGroupLabel}>Ancho:</label>
                  <input
                    name="width"
                    value={product?.width}
                    onChange={handleChange}
                    className={inputs.inputGroupInput}
                  />
                </div>
                <div className={inputs.inputGroup}>
                  <label className={inputs.inputGroupLabel}>Alto:</label>
                  <input
                    name="height"
                    value={product?.height}
                    onChange={handleChange}
                    className={inputs.inputGroupInput}
                  />
                </div>
                <div className={inputs.inputGroup}>
                  <label className={inputs.inputGroupLabel}>Peso:</label>
                  <input
                    name="weight"
                    value={product?.weight}
                    onChange={handleChange}
                    className={inputs.inputGroupInput}
                  />
                </div>
                <div className={inputs.inputGroup}>
                  <label className={inputs.inputGroupLabel}>
                    Múltiplo de ganancia:
                  </label>
                  <input
                    name="earning_percentage"
                    value={product?.earning_percentage}
                    onChange={handleChange}
                    className={inputs.inputGroupInput}
                  />
                </div>

                <div className={inputs.inputGroup}>
                  <label className={inputs.inputGroupLabel}>Insumos:</label>
                  <select
                    className={inputs.inputGroupInput}
                    onChange={handleAddSupply}
                  >
                    <option></option>
                    {allSupplies &&
                      allSupplies?.map((s) => {
                        const supplyAlreadyAdded = product?.Supplies?.some(
                          (supply) => s?.name === supply
                        );
                        if (!supplyAlreadyAdded) {
                          return (
                            <option key={s?.name} value={s?.name}>
                              {s?.name}
                            </option>
                          );
                        }
                      })}
                  </select>
                </div>
                {product?.Supplies?.length > 0 && (
                  <div>
                    {product?.Supplies?.map((s) => {
                      return (
                        <button
                          key={s}
                          type="button"
                          value={s}
                          onClick={handleRemoveSupply}
                          style={{
                            color: "white",
                            backgroundColor: "rgb(254, 116, 98)",
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className={inputs.inputGroup}>
                  <label className={inputs.inputGroupLabel}>Imágen:</label>
                  <input
                    name="img"
                    value={product?.img}
                    className={inputs.inputGroupInput}
                    onChange={handleChange}
                  />
                </div>

                <div className={inputs.inputGroup}>
                  <label className={inputs.inputGroupLabel}>Duración:</label>
                  <input
                    name="duration"
                    value={product?.duration}
                    className={inputs.inputGroupInput}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
            <button onClick={() => handleSubmit()}>MODIFICAR</button>
            <button onClick={() => navigate("/catalogue")}>VOLVER</button>
          </div>
        )}
      </>
    );
  }
};
