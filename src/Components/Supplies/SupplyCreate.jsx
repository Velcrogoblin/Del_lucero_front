import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import { Login } from "../Login/Login";
import inputs from "../../styles/inputs.module.css";
import styles from "./SuppliesCreate.module.css";
const VITE_URL_SUPPLIES = import.meta.env.VITE_URL_SUPPLIES;

export const SupplyCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [supply, setSupply] = useState({
    name: "",
    cost: 0,
  });

  const handleChange = (e) => {
    setSupply({ ...supply, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let response = await axios.post(VITE_URL_SUPPLIES, {
        ...supply,
        token,
      });
      setLoading(false);
      alert(response.data.message);
      navigate("/supplies");
    } catch (error) {
      setLoading(false);
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    setToken(JSON.parse(window.localStorage.getItem("token")));
    setLoading(false);
  }, []);

  if (token === null || token?.length < 150) {
    return <Login />;
  } else {
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.containerCreate}>
            <h2>CREAR NUEVO INSUMO</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className={inputs.inputGroup}>
                  <label className={inputs.inputGroupLabel}>Insumo:</label>
                  <input
                    name="name"
                    className={inputs.inputGroupInput}
                    onChange={handleChange}
                  />
                </div>

                <div className={inputs.inputGroup}>
                  <label className={inputs.inputGroupLabel}>Costo:</label>
                  <input
                    name="cost"
                    onChange={handleChange}
                    className={inputs.inputGroupInput}
                  />
                </div>
              </div>
            </form>
            <button onClick={() => handleSubmit()}>CREAR</button>
            <button type="button" onClick={() => navigate("/supplies")}>
              VOLVER
            </button>
          </div>
        )}
      </div>
    );
  }
};
