import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import inputs from "../../styles/inputs.module.css";
import styles from "./orders.module.css";
import buttons from "../../styles/buttons.module.css";
import { Loading } from "../Loading/Loading";
const VITE_URL_ORDERS = import.meta.env.VITE_URL_ORDERS;
const VITE_URL_PURCHASES = import.meta.env.VITE_URL_PURCHASES;

const VITE_URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCTS;

export const OrderEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleUpdateProductQuantity = (productId, operation) => {
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
          { product_id: selectedProductId, quantity: 1 },
        ],
      });
    }
  };

  const calcularPrecioTotal = (order, products) => {
    let precioTotal = 0;
    for (let i = 0; i < order.products.length; i++) {
      const productId = order.products[i].product_id;
      const quantity = order.products[i].quantity;
      const product = products.find((p) => p.product_id === productId);

      if (product) {
        precioTotal += product.price * quantity;
      }
    }
    return precioTotal;
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (order.status === "Entregada") {
      let totalPrice = calcularPrecioTotal(order, products);

      let purchase = {
        client_id: order.client_id,
        date: new Date(),
        products: order.products,
        total_amount: totalPrice,
      };

      try {
        let response = await axios.post(VITE_URL_PURCHASES, {
          ...purchase,
          token,
        });
        setLoading(false);
        navigate("/orders/grid");
        return alert(response.data.message);
      } catch (error) {
        console.error(error);
        setLoading(false);
        return alert(error.message);
      }
    }

    if (order.status === "Cancelada") {
      try {
        let response = await axios.put(`${VITE_URL_ORDERS}delete/`, {
          order_id: order.order_id,
          token,
        });
        setLoading(false);
        navigate("/orders/grid");
        return alert(response.data.message);
      } catch (error) {
        console.log(error);
        setLoading(false);
        return alert(error.message);
      }
    }

    try {
      let response = await axios.put(VITE_URL_ORDERS, {
        ...order,
        token,
      });
      console.log(response);
      setLoading(false);
      navigate("/orders/grid");
      return alert(response.data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return alert(error.message);
    }
  };

  useEffect(() => {
    axios.get(`${VITE_URL_ORDERS}id/${id}`).then((res) => {
      const formattedDeliveryDate = new Date(res.data.delivery_date)
        .toISOString()
        .split("T")[0];
      const formattedOrder = {
        ...res.data,
        delivery_date: formattedDeliveryDate,
      };
      setOrder(formattedOrder);
    });

    axios
      .get(VITE_URL_PRODUCTS)
      .then((res) => setProducts(res.data))
      .then(() => setLoading(false));
    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={inputs.inputGroup}>
              <label className={inputs.inputGroupLabel}>Cliente: </label>
              {order.Client && (
                <input
                  value={order.Client.name}
                  className={inputs.inputGroupInput}
                />
              )}
            </div>
            <div className={inputs.inputGroup}>
              <label className={inputs.inputGroupLabel}>Productos: </label>
              <select
                onChange={(e) => handleAddProduct(e)}
                className={inputs.inputGroupInput}
              >
                <option>Seleccione uno o mas productos</option>
                {products &&
                  products.map((p) => {
                    let productAlreadyAdded;
                    if (order.products) {
                      productAlreadyAdded = order.products.some(
                        (product) => product.product_id === p.product_id
                      );
                    }
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
            {order.products && (
              <div>
                <div>
                  {order.products &&
                    order.products.map((p) => {
                      const selectedProduct = products.find(
                        (product) =>
                          parseInt(product.product_id) ===
                          parseInt(p.product_id)
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
                                  handleUpdateProductQuantity(
                                    p.product_id,
                                    "add"
                                  )
                                }
                                className={buttons.substractButton}
                              >
                                +
                              </span>
                              <span
                                onClick={() =>
                                  handleDeleteProduct(p.product_id)
                                }
                                className={buttons.substractButton}
                              >
                                B
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
                Fecha de entrega:{" "}
              </label>
              <input
                type="date"
                name={"delivery_date"}
                onChange={handleChange}
                value={order.delivery_date}
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
                <option></option>
                <option value={"Retiro"}>Retiro</option>
                <option value={"A domicilio"}>A domicilio</option>
              </select>
            </div>
            <div className={inputs.inputGroup}>
              <label className={inputs.inputGroupLabel}>Estado: </label>
              <select
                onChange={handleChange}
                name={"status"}
                className={inputs.inputGroupInput}
              >
                <option></option>
                <option value={"Cancelada"}>Cancelada</option>
                <option value={"En preparacion"}>En preparación</option>
                <option value={"En preparación - Pagada"}>
                  En preparación - Pagada
                </option>
                <option value={"Lista para entregar"}>
                  Lista para entregar
                </option>
                <option value={"Lista para entregar - Pagada"}>
                  Lista para entregar - Pagada
                </option>
                <option value={"Entregada"}>Entregada</option>
              </select>
            </div>
            <div
              onClick={() => handleSubmit()}
              className={buttons.createButton}
            >
              Editar Orden
            </div>
            <div
              onClick={() => navigate("/orders/grid")}
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
