import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import inputs from "../../styles/inputs.module.css";
import styles from "./ProductCreate.module.css";
const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;
const VITE_URL_SUPPLIES = import.meta.env.VITE_URL_SUPPLIES;

export const ProductCreate = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [supplies, setSupplies] = useState();
  const [product, setProduct] = useState({
    name: "",
    width: 0,
    height: 0,
    weight: 0,
    earning_percentage: 0,
    img: "",
    duration: 0,
    product_supplies: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddSupply = (e) => {
    setProduct({
      ...product,
      product_supplies: [...product.product_supplies, e.target.value],
    });
  };

  const handleRemoveSupply = (e) => {
    setProduct({
      ...product,
      product_supplies: product.product_supplies.filter(
        (s) => s !== e.target.value
      ),
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    if (token.length < 150) {
      alert("Tenes que estar logueado para crear un producto");
    } else {
      try {
        const response = await axios.post(VITE_URL_PRODUCTS, {
          ...product,
          token: token,
        });

        setLoading(false);
        alert(response.data.message);

        navigate("/catalogue");
      } catch (error) {
        setLoading(false);
        alert(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    setToken(JSON.parse(window.localStorage.getItem("token")));
    axios.get(VITE_URL_SUPPLIES).then((res) => setSupplies(res.data));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.containerCreate}>
          <h2>CREAR NUEVO PRODUCTO</h2>
          <form>
            <div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Nombre:</label>
                <input
                  name="name"
                  value={product.name}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Ancho:</label>
                <input
                  name="width"
                  value={product.width}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Alto:</label>
                <input
                  name="height"
                  value={product.height}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Peso:</label>
                <input
                  name="weight"
                  value={product.weight}
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
                  value={product.earning_percentage}
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
                  {supplies &&
                    supplies?.map((s) => {
                      const supplyAlreadyAdded = product.product_supplies.some(
                        (supply) => s.name === supply
                      );
                      if (!supplyAlreadyAdded) {
                        return (
                          <option key={s.name} value={s.name}>
                            {s.name}
                          </option>
                        );
                      }
                    })}
                </select>
              </div>
              {product?.product_supplies.length > 0 && (
                <div>
                  {product?.product_supplies?.map((s) => {
                    return (
                      <button
                        key={s}
                        type="button"
                        value={s}
                        style={{
                          color: "white",
                          backgroundColor: "rgb(254, 116, 98)",
                        }}
                        onClick={handleRemoveSupply}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              )}
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Imagen:</label>
                <input
                  name="img"
                  value={product.img}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
              </div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Duración:</label>
                <input
                  name="duration"
                  value={product.duration}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
          <button onClick={() => handleSubmit()}>CREAR</button>
          <button type="button" onClick={() => navigate("/catalogue")}>
            VOLVER
          </button>
        </div>
      )}
    </>
  );
};
