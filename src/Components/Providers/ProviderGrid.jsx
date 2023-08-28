import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../Clients/createclient.module.css";
import tables from "../../styles/tables.module.css";
import buttons from "../../styles/buttons.module.css";
import editImage from "../../Image/lapiz.png";
import deleteImage from "../../Image/delete.png";
import onStart from "../../Image/on.png";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";
const VITE_URL_PROVIDERS = import.meta.env.VITE_URL_PROVIDERS;

export const ProviderGrid = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(JSON.parse(window.localStorage.getItem("token")));
    console.log(token);
    axios
      .get(VITE_URL_PROVIDERS)
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (supplier_id) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${VITE_URL_PROVIDERS}delete/${supplier_id}`,
        { token }
      );
      alert(response.data.message);
      setLoading(false);
    } catch (error) {
      alert("No pudimos borrar el proveedor");
      setLoading(false);
    }
  };
  const handleEdit = (e) => {
    const { alt } = e.target;
    navigate(`/providers/edit/${alt}`);
  };
  return (
    <>
      <h4 style={{ textAlign: "center" }}> Listado Proveedores</h4>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.searchClient}>
          <table className={tables.mainTable}>
            <thead>
              <tr className={tables.tableRow}>
                <th className={tables.tableHeaderItem}>Nombre</th>
                <th className={tables.tableHeaderItem}>Editar</th>
                <th className={tables.tableHeaderItem}>Borrar</th>
              </tr>
            </thead>
            <tbody>
              {suppliers &&
                suppliers.map((sup) => {
                  return (
                    <tr className={style.trBody} key={sup.supplier_id}>
                      <td className={tables.tableItem}>{sup.name}</td>
                      <td className={tables.tableItem}>
                        <img
                          style={{ height: "20px", width: "18px" }}
                          src={editImage}
                          alt={sup.supplier_id}
                          onClick={(e) => handleEdit(e)}
                        />
                      </td>
                      {sup.active === true ? (
                        <td
                          className={tables.tableItem}
                          onClick={() => handleDelete(sup.supplier_id)}
                        >
                          <img
                            style={{ height: "20px", width: "18px" }}
                            src={deleteImage}
                            alt={"delete"}
                          />
                        </td>
                      ) : (
                        <td
                          className={tables.tableItem}
                          onClick={() => handleDelete(sup.supplier_id)}
                        >
                          <img
                            style={{ height: "20px", width: "18px" }}
                            src={onStart}
                            alt={"delete"}
                          />
                        </td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div
            type="button"
            className={buttons.createButton}
            onClick={() => navigate("/providers")}
          >
            Volver
          </div>
        </div>
      )}
    </>
  );
};
