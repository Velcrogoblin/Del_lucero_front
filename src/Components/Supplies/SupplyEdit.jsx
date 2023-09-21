import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import { Login } from "../Login/Login";
import inputs from "../../styles/inputs.module.css";
import styles from "./SupplyEdit.module.css";
const VITE_URL_SUPPLIES = import.meta.env.VITE_URL_SUPPLIES;

export const SupplyEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [supply, setSupply] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setSupply({ ...supply, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(VITE_URL_SUPPLIES, {
        ...supply,
        token,
      });
      setLoading(false);
      alert("insumo editado");
      navigate("/supplies");
    } catch (error) {
      setLoading(false);
      alert("ocurrio un error");
    }
  };

  useEffect(() => {
    axios
      .get(`${VITE_URL_SUPPLIES}id/${id}`)
      .then((res) => setSupply(res.data))
      .then(() => setLoading(false));
    setToken(JSON.parse(window.localStorage.getItem("token")));
  }, []);

  if (token === null || token?.length < 150) {
    return <Login />;
  } else {
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.containerEdit}>
            <h2>EDITAR INSUMO</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className={inputs.inputGroup}>
                  <label className={inputs.inputGroupLabel}>Nombre:</label>
                  <input
                    value={supply.name}
                    name="name"
                    className={inputs.inputGroupInput}
                    onChange={handleChange}
                  />
                </div>

                <div className={inputs.inputGroup}>
                  <label className={inputs.inputGroupLabel}>Costo:</label>
                  <input
                    value={supply.cost}
                    name="cost"
                    onChange={handleChange}
                    className={inputs.inputGroupInput}
                  />
                </div>
              </div>
            </form>
            <button onClick={() => handleSubmit()}>MODIFICAR</button>
            <button onClick={() => navigate("/supplies")}>VOLVER</button>
          </div>
        )}
      </div>
    );
  }
};
