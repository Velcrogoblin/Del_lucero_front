import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import inputs from "../../styles/inputs.module.css";
import styles from "./ExpenseEdit.module.css";
const VITE_URL_EXPENSES = import.meta.env.VITE_URL_EXPENSES;

export const ExpenseEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [expense, setExpense] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (token.length < 150) {
      alert("Debes estar logueado para editar proveedores");
    } else {
      try {
        await axios.put(VITE_URL_EXPENSES, {
          ...expense,
          token,
        });
        setLoading(false);
        alert("gasto editado");
        navigate("/expenses");
      } catch (error) {
        setLoading(false);
        alert("ocurrio un error");
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${VITE_URL_EXPENSES}id/${id}`)
      .then((res) => {
        const formattedDate = new Date(res.data.date)
          .toISOString()
          .split("T")[0];
        const formattedExpense = {
          ...res.data,
          date: formattedDate,
        };
        setExpense(formattedExpense);
      })
      .then(() => setLoading(false));
    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.containerEdit}>
          <h2 style={{ color: "white", textAlign: "center" }}>EDITAR GASTO</h2>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Nombre:</label>
                <input
                  value={expense.name}
                  name="name"
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
              </div>

              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Fecha:</label>
                <input
                  type="date"
                  value={expense.date}
                  name={"date"}
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>

              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Costo:</label>
                <input
                  value={expense.amount}
                  name="amount"
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
                />
              </div>
            </div>
          </form>

          <button onClick={() => handleSubmit()}>MODIFICAR</button>
          <button onClick={() => navigate("/expenses")}>VOLVER</button>
        </div>
      )}
    </div>
  );
};
