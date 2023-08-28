import { useEffect, useState } from "react";
import axios from "axios";
import inputs from "../../styles/inputs.module.css";
import buttons from "../../styles/buttons.module.css";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";
const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;

export const ProductCreate = () => {
  const navigate = useNavigate();
  // const [token, setToken] = useState("");
  const [product, setProduct] = useState({
    name: "",
    width: 0,
    height: 0,
    weight: 0,
    stock: 0,
    price: 0,
    img: "",
    duration: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setProduct({
      name: "",
      width: 0,
      height: 0,
      weight: 0,
      stock: 0,
      price: 0,
      img: "",
      duration: 0,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    // if (token.length < 150) {
    //   alert("Tenes que estar logueado para crear un producto");
    // } else {
      try {
        const response = await axios.post(VITE_URL_PRODUCTS, {
          ...product,
         // token: token,
        });

        setLoading(false);
        alert(response.data.message);

        handleReset();
        //navigate("/clients");
      } catch (error) {
        setLoading(false);
        alert(error.response.data.message);
      }
    //}
  };

  // useEffect(() => {
  //   setToken(JSON.parse(window.localStorage.getItem("token")));
  // }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h3 style={{ color: "white", textAlign: "center" }}>
            Crear nuevo producto
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
                  required
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Ancho </label>
                <input
                  name="width"
                  value={product.width}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                  required
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Alto </label>
                <input
                  name="height"
                  value={product.height}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                  required
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Peso </label>
                <input
                  name="weight"
                  value={product.weight}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                  required
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Stock </label>
                <input
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                  required
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Precio </label>
                <input
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                  required
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Imagen </label>
                <input
                  name="img"
                  value={product.img}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Duración </label>
                <input
                  name="duration"
                  value={product.duration}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div
              onClick={() => handleSubmit()}
              className={buttons.createButton}
            >
              Crear
            </div>
            <div
              type="button"
              onClick={handleReset}
              className={buttons.createButton}
            >
              Limpiar campos
            </div>
            <div
              onClick={() => navigate("/products")}
              className={buttons.createButton}
            >
              Volver
            </div>
          </form>
        </>
      )}
    </>
  );
};
