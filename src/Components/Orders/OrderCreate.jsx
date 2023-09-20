import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import inputs from "../../styles/inputs.module.css";
import buttons from "../../styles/buttons.module.css";
import styles from "./orders.module.css";
const VITE_URL_ORDERS = import.meta.env.VITE_URL_ORDERS;
const VITE_URL_CLIENTS = import.meta.env.VITE_URL_CLIENTS;
const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;
const VITE_URL_SUPPLIES = import.meta.env.VITE_URL_SUPPLIES;
const VITE_URL_PURCHASES = import.meta.env.VITE_URL_PURCHASES;

export const OrderCreate = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    products: [],
    date: new Date().toISOString().slice(0, 10),
  });
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [supplies, setSupplies] = useState();

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProductQuantity = (productId, operation) => {
    const productAux = products.find((p) => p.product_id === productId);
    const updatedProducts = order.products.map((product) =>
      product.product_id === productId
        ? {
            ...product,
            quantity:
              operation === "add"
                ? product.quantity + 1
                : product.quantity < 2
                ? product.quantity
                : product.quantity - 1,
          }
        : product
    );

    setOrder({
      ...order,
      products: updatedProducts,
    });
  };

  const handleDeleteProduct = (product_id) => {
    const filteredProducts = order.products.filter(
      (p) => p.product_id !== product_id
    );
    setOrder({
      ...order,
      products: filteredProducts,
    });
  };

  const handleAddProduct = (e) => {
    const selectedProductId = parseInt(e.target.value);
    const productAux = products.find((p) => p.product_id === selectedProductId);
    let priceAux = 0;
    productAux.Supplies.map((s) => s.name === "cera" ? priceAux += Math.round(s.cost * (productAux.weight / 1000)) : priceAux += s.cost);
    const existingProduct = order.products.find(
      (product) => product.product_id === selectedProductId
    );

    if (existingProduct) {
      const updatedProducts = order.products.map((product) =>
        product.product_id === selectedProductId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );

      setOrder({
        ...order,
        products: updatedProducts,
      });
    } else {
      setOrder({
        ...order,
        products: [
          ...order.products,
          {
            product_id: selectedProductId,
            quantity: 1,
            price: priceAux * productAux.earning_percentage,
          },
        ],
      });
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      if (
        order.status === "Entregado" &&
        (order.paid === true || order.paid === "true")
      ) {
        let response = await axios.post(VITE_URL_PURCHASES, {
          ...order,
          token,
        });
        setLoading(false);
        alert(response.data.message);
      } else {
        let response = await axios.post(VITE_URL_ORDERS, {
          ...order,
          token,
        });
        setLoading(false);
        alert(response.data.message);
      }
      navigate("/orders");
    } catch (error) {
      setLoading(false);
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    axios.get(VITE_URL_PRODUCTS).then((res) => setProducts(res.data));
    axios.get(VITE_URL_CLIENTS).then((res) => setClients(res.data));
    axios
      .get(VITE_URL_SUPPLIES)
      .then((res) => setSupplies(res.data.filter((s) => s.name === "cera")));
    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.containerEdit}>
          <h2>CREAR NUEVO PEDIDO</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={inputs.inputGroup}>
              <label className={inputs.inputGroupLabel}>Cliente:</label>
              <select
                name={"client_id"}
                onChange={handleChange}
                className={inputs.inputGroupInput}
              >
                <option></option>
                {clients &&
                  clients.map((c) => (
                    <option value={c.client_id} key={c.client_id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className={inputs.inputGroup}>
              <label className={inputs.inputGroupLabel}>Productos:</label>
              <select
                onChange={(e) => handleAddProduct(e)}
                className={inputs.inputGroupInput}
              >
                <option></option>
                {products &&
                  products.map((p) => {
                    const productAlreadyAdded = order.products.some(
                      (product) => product.product_id === p.product_id
                    );
                    if (!productAlreadyAdded) {
                      return (
                        <option value={p.product_id} key={p.product_id}>
                          {p.name}
                        </option>
                      );
                    }
                  })}
              </select>
            </div>
            {order.products.length > 0 && (
              <div>
                <div>
                  {order.products.map((p) => {
                    const selectedProduct = products.find(
                      (product) =>
                        parseInt(product.product_id) === parseInt(p.product_id)
                    );
                    return (
                      <div
                        key={p.product_id}
                        className={styles.selectedContainer}
                      >
                        <div>
                          {selectedProduct && (
                            <img
                              src={selectedProduct.img}
                              alt={selectedProduct.name}
                              className={styles.selectedImg}
                            />
                          )}
                        </div>

                        <div className={styles.selectedRight}>
                          <span className={styles.selectedName}>
                            {selectedProduct.name}
                          </span>
                          <div className={styles.selectedBottomRight}>
                            <span
                              onClick={() =>
                                handleUpdateProductQuantity(
                                  p.product_id,
                                  "subtract"
                                )
                              }
                              className={buttons.substractButton}
                            >
                              -
                            </span>
                            <p className={styles.selectedQuantity}>
                              {p.quantity}
                            </p>
                            <span
                              onClick={() =>
                                handleUpdateProductQuantity(p.product_id, "add")
                              }
                              className={buttons.substractButton}
                            >
                              +
                            </span>
                            <span
                              onClick={() => handleDeleteProduct(p.product_id)}
                              className={buttons.deleteButton}
                            >
                              X
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div className={inputs.inputGroup}>
              <label className={inputs.inputGroupLabel}>
                Fecha de entrega:
              </label>
              <input
                type="date"
                name={"delivery_date"}
                onChange={handleChange}
                className={inputs.inputGroupInput}
              />
            </div>
            <div className={inputs.inputGroup}>
              <label className={inputs.inputGroupLabel}>Tipo de entrega:</label>
              <select
                onChange={handleChange}
                name={"delivery_method"}
                className={inputs.inputGroupInput}
              >
                <option> </option>
                <option value={"Retiro"}>Retiro</option>
                <option value={"A domicilio"}>A domicilio</option>
              </select>
            </div>
            <div className={inputs.inputGroup}>
              <label className={inputs.inputGroupLabel}>Estado:</label>
              <select
                onChange={handleChange}
                name={"status"}
                className={inputs.inputGroupInput}
              >
                <option></option>
                <option value={"En preparación"}>En preparación</option>
                <option value={"Cancelado"}>Cancelado</option>
                <option value={"Listo para entregar"}>
                  Listo para entregar
                </option>
                <option value={"Entregado"}>Entregado</option>
              </select>
            </div>
            <div className={inputs.inputGroup}>
              <label className={inputs.inputGroupLabel}>Descuento:</label>
              <input
                name="discount"
                onChange={handleChange}
                className={inputs.inputGroupInput}
              />
            </div>
            <div className={inputs.inputGroup}>
              <label className={inputs.inputGroupLabel}>Pagado:</label>
              <select
                onChange={handleChange}
                name={"paid"}
                className={inputs.inputGroupInput}
              >
                <option></option>
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
          </form>
          <button onClick={() => handleSubmit()}>CREAR PEDIDO</button>
          <button onClick={() => navigate("/orders")}>VOLVER</button>
        </div>
      )}
    </>
  );
};
