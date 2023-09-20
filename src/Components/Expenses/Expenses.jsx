import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Expenses.module.css";
const VITE_URL_EXPENSES = import.meta.env.VITE_URL_EXPENSES;

export const Expenses = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState();

  function compareDates(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
  
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    let response = axios
      .get(VITE_URL_EXPENSES)
      .then((res) => setExpenses(res.data.sort(compareDates)));
  }, []);

  return (
    <div className={styles.containerExpenses}>
      <div className={styles.gridExpenses}>
        {expenses &&
          expenses.map((e) => (
            <div
              key={e.expense_id}
              className={styles.cards}
              onClick={() => navigate(`/expenses/edit/${e.expense_id}`)}
            >
              <p>{`${new Date(e.date).getUTCDate()} / ${
                new Date(e.date).getUTCMonth() + 1
              }`}</p>

              <p>{e.name}</p>
              <h4>${e.amount}</h4>
            </div>
          ))}
      </div>
      <button onClick={() => navigate("/expenses/create")}>+</button>
      <button type="button" onClick={() => navigate("/")}>
        VOLVER
      </button>
    </div>
  );
};
