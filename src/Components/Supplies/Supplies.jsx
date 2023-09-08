import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import buttons from "../../styles/buttons.module.css";
import containers from "../../styles/containers.module.css";
const VITE_URL_SUPPLIES = import.meta.env.VITE_URL_SUPPLIES;

export const Supplies = () => {
  const navigate = useNavigate();
  const [supplies, setSupplies] = useState();

  useEffect(() => {
    let response = axios
      .get(VITE_URL_SUPPLIES)
      .then((res) => setSupplies(res.data));
  }, []);

  return (
    <div className={containers.ordersContainer}>
      <div
        className={buttons.buttonMenu}
        onClick={() => navigate("/supplies/create")}
      >
        Crear insumo
      </div>
      <div className={containers.ordersContainerNew}>
        {supplies &&
          supplies.map((s) => (
            <div key={s.supply_id} className={containers.order} onClick={() => navigate(`/supplies/edit/${s.supply_id}`)}>
              <p>{s.name}</p>
              <p>{s.cost}</p>
            </div>
          ))}
      </div>
      <div onClick={() => navigate("/")} className={buttons.buttonMenu}>
        Volver
      </div>
    </div>
  );
};
