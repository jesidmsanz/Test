import React, { useState } from "react";
const moment = require("moment");

export default function Form() {
  const [data, setData] = useState({ fechaInicial: "", fechaFinal: "" });
  const [apiData, setApiData] = useState([]);

  const api = "https://backend.assiscontrol.proyectatech.com/material-tools";
 

  const loadApi = async () => {
    const result = await fetch(api);
    const data1 = await result.json();
    if (data1.length) {
      const result = data1.filter((item) => {
        const date = moment(item.created_at).format("YYYY-MM-DD");
        const valid = moment(date).isBetween(
          data.fechaInicial,
          data.fechaFinal
        );
        item.created_at = date;
        if (valid) {
          return item;
        }
      });
      setApiData(result);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>CALL TO API</h1>
      <button onClick={loadApi} disabled>cargar api</button>

      <label>fecha Inicial</label>
      <input
        name="fechaInicial"
        value={data.fechaInicial}
        type="date"
        onChange={handleChange}
      />

      <label>fecha final</label>
      <input
        name="fechaFinal"
        value={data.fechaFinal}
        type="date"
        onChange={handleChange}
      />

      <h1>Resultado</h1>
      {apiData.length > 0 &&
        apiData.map((item) => (
          <div>
            <h3>Nombre del producto: {item.name}</h3>
            <h3>Fecha de creacion: {item.created_at}</h3>
            <hr />
          </div>
        ))}
    </div>
  );
}
