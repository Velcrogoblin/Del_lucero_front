import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import buttons from "../../styles/buttons.module.css";
import containers from "../../styles/containers.module.css";
const VITE_URL_EXPENSES = import.meta.env.VITE_URL_EXPENSES;

export const Expenses = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState();

  useEffect(() => {
    let response = axios
      .get(VITE_URL_EXPENSES)
      .then((res) => setExpenses(res.data));
  }, []);

  return (
    <div className={containers.ordersContainer}>
      <div
        className={buttons.buttonMenu}
        onClick={() => navigate("/expenses/create")}
      >
        Crear gasto
      </div>
      <div className={containers.ordersContainerNew}>
        {expenses &&
          expenses.map((e) => (
            <div key={e.expense_id} className={containers.order} onClick={() => navigate(`/expenses/edit/${e.expense_id}`)}>
              <p>{`${new Date(e.date).getUTCDate()} / ${
                new Date(e.date).getUTCMonth() + 1
              }`}</p>

              <p>{e.name}</p>
              <p>{e.amount}</p>
            </div>
          ))}
      </div>
      <div onClick={() => navigate("/")} className={buttons.buttonMenu}>
        Volver
      </div>
    </div>
  );
};
