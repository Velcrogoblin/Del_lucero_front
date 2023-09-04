import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import inputs from "../../styles/inputs.module.css";
import buttons from "../../styles/buttons.module.css";
import { Loading } from "../Loading/Loading";
const VITE_URL_EXPENSES = import.meta.env.VITE_URL_EXPENSES;


export const ExpenseCreate = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState (false);
    const [token, setToken] = useState();
    const [expense, setExpense] = useState({
        name: "",
        date: new Date().toISOString().slice(0, 10),
        amount: 0,
    })

    const handleChange = (e) => {
        setExpense({...expense, [e.target.name]: e.target.value})
    }

    const handleSubmit = async () => {
        setLoading(true);
        // if (token.length < 150) {
        //     alert("Tenes que estar logueado para crear un producto");
        //   } else {
        try {
            let response = await axios.post(VITE_URL_EXPENSES, {
                ...expense,
                token
            });
            setLoading(false);
            alert(response.data.message);
            navigate("/");
        } catch (error) {
            setLoading(false);
            alert(error.response.data.error)
        }
    // }
}

    useEffect (() => {
        setToken(JSON.parse(window.localStorage.getItem("token")));
    },[]);


    return (
        <div>
            {loading ? (
        <Loading />
      ) : (
        <>
        <h3 style={{ color: "white", textAlign: "center" }}>
            Crear nuevo gasto
          </h3>

          <form onSubmit={(e) => handleSubmit(e)}>
          <div>
              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Nombre </label>
                <input
                  name="name"
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
              </div>

              <div className={inputs.inputGroup}>
              <label className={inputs.inputGroupLabel}>
                Fecha:
              </label>
              <input
                type="date"
                name={"date"}
                onChange={handleChange}
                className={inputs.inputGroupInput}
              />
            </div>

              <div className={inputs.inputGroup}>
                <label className={inputs.inputGroupLabel}>Costo</label>
                <input
                  name="amount"
                  onChange={handleChange}
                  className={inputs.inputGroupInput}
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
              onClick={() => navigate("/expenses")}
              className={buttons.createButton}
            >
              Volver
            </div>
            </form>
        </>
      )}
        </div>
    )
}
