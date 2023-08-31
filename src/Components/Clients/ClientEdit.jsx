import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import style from "./createclient.module.css";
import buttons from "../../styles/buttons.module.css";
import inputs from "../../styles/inputs.module.css";
import { Loading } from "../Loading/Loading";
const VITE_URL_CLIENTS = import.meta.env.VITE_URL_CLIENTS;

export const ClientEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

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
    window.localStorage.getItem("token");
    setToken(JSON.parse(window.localStorage.getItem("token")));
    axios
      .get(`${VITE_URL_CLIENTS}id/${id}`)
      .then((resp) => setClient(resp.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={style.searchClient}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h4 style={{ color: "white", textAlign: "center" }}>
            {" "}
            Editar Cliente
          </h4>
          {client && (
            <form>
              <div className={inputs.inputGroup}>
                <input
                  type="text"
                  name="name"
                  value={client.name}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
                <label className={inputs.inputGroupLabel}>Nombre</label>
              </div>
              <div className={inputs.inputGroup}>
                <input
                  type="text"
                  name="address"
                  value={client.address}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
                <label className={inputs.inputGroupLabel}>Direccion</label>
              </div>
              <div className={inputs.inputGroup}>
                <input
                  type="text"
                  name="phone"
                  value={client.phone}
                  className={inputs.inputGroupInput}
                  onChange={handleChange}
                />
                <label className={inputs.inputGroupLabel}>Telefono</label>
              </div>
              <div
                className={buttons.createButton}
                onClick={() => handleSubmit()}
              >
                Modificar
              </div>
              <div
                type="button"
                className={buttons.createButton}
                onClick={() => navigate("/clients/")}
              >
                Volver
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
};
