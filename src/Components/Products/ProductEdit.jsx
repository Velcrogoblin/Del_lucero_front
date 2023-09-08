import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import buttons from "../../styles/buttons.module.css";
import inputs from "../../styles/inputs.module.css";
import axios from "axios";
import { Loading } from "../Loading/Loading";
const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;

export const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (token.length < 150) {
      alert("Debes estar logueado para editar productos");
    } else {
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
    }
  };

  useEffect(() => {
    axios
      .get(`${VITE_URL_PRODUCTS}id/${id}`)
      .then((res) => setProduct(res.data))
      .then(() => setLoading(false));
    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h3 style={{ color: "white", textAlign: "center" }}>
            Editar producto
          </h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Nombre </label>
                <input
                  name="name"
                  value={product.name}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Ancho </label>
                <input
                  name="width"
                  value={product.width}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Alto </label>
                <input
                  name="height"
                  value={product.height}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Peso </label>
                <input
                  name="weight"
                  value={product.weight}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Imagen </label>
                <input
                  name="img"
                  value={product.img}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Duración </label>
                <input
                  name="duration"
                  value={product.duration}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              onClick={() => handleSubmit()}
              className={buttons.createButton}
            >
              Modificar
            </div>
            <div
              className={buttons.createButton}
              onClick={() => navigate("/catalogue")}
            >
              Volver
            </div>
          </form>
        </>
      )}
    </>
  );
};
