import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loading } from "../Loading/Loading";
import { Login } from "../Login/Login";
import styles from "./ClientEdit.module.css";
import inputs from "../../styles/inputs.module.css";
const VITE_URL_CLIENTS = import.meta.env.VITE_URL_CLIENTS;

export const ClientEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let res = await axios.put(`${VITE_URL_CLIENTS}edit/`, {
        ...client,
        token,
      });
      alert(res.data.message);
      setLoading(false);
      navigate("/clients");
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };
  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setToken(JSON.parse(window.localStorage.getItem("token")));
    axios
      .get(`${VITE_URL_CLIENTS}id/${id}`)
      .then((resp) => setClient(resp.data))
      .then(() => setLoading(false))
      .catch((err) => console.error(err));
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
            <h2>EDITAR CLIENTE</h2>
            {client && (
              <form>
                <div>
                  <div className={inputs.inputGroup}>
                    <label className={inputs.inputGroupLabel}>Nombre:</label>
                    <input
                      type="text"
                      name="name"
                      value={client.name}
                      className={inputs.inputGroupInput}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={inputs.inputGroup}>
                    <label className={inputs.inputGroupLabel}>Dirección:</label>
                    <input
                      type="text"
                      name="address"
                      value={client.address}
                      className={inputs.inputGroupInput}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={inputs.inputGroup}>
                    <label className={inputs.inputGroupLabel}>Teléfono:</label>
                    <input
                      type="text"
                      name="phone"
                      value={client.phone}
                      className={inputs.inputGroupInput}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
            )}
            <button onClick={() => handleSubmit()}>MODIFICAR</button>
            <button type="button" onClick={() => navigate("/clients/")}>
              VOLVER
            </button>
          </div>
        )}
      </div>
    );
  }
};
