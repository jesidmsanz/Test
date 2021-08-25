import React, { useState } from "react";

const materiales = [
  { id: 1, name: "martillo", price: 20000 },
  { id: 2, name: "bloque", price: 30000 },
  { id: 3, name: "pinsa", price: 40000 },
  { id: 4, name: "taladro", price: 50000 },
];

const ventas = [];
const devoluciones = [];

export default function Inventary() {
  const [data, setData] = useState({ materialesId: "", amount: "" });
  const [date, setDate] = useState({ materialesId: "", amount: "" });
  const [report, setReport] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log(`DATA MOUNT`, data);

  const handleClick = (e) => {
    e.preventDefault();
    ventas.push(data);
    handleReset();
  };

  const totalVentas = () => {
    const data = materiales
      .map((item) => {
        let acum = 0;
        let array = [];
        ventas.map((element) => {
          if (item.id == element.materialesId) {
            acum = acum + parseInt(element.amount, 10);
            element.totalAmount = acum;
            element.totalPrice = element.totalAmount * item.price;
            array.push(element);
          }
        });
        const position = array.length - 1;
        const result = array[position];
        if (result != undefined) {
          return result;
        }
      })
      .filter((item) => item != undefined);
    console.log(`data------`, data);
  };
  const handleReset = () => {
    setData({ materialesId: "", amount: "" });
    setDate({ materialesId: "", amount: "" });
  };

  console.log(`ventas`, ventas);

  const handleReturn = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };
  console.log("DATE RETURN", date);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ventas.length > 0) {
      const newVentas = ventas.filter((item) => {
        if (item.materialesId == date.materialesId) {
          return item;
        }
      });
      if (newVentas.length > 0) {
        if (date.amount <= newVentas[0].amount) {
          devoluciones.push(date);
          handleReset();
          alert("devolucion exitosa");
        } else {
          alert("estas devolviendo mas de la cuenta");
        }
      } else {
        alert("nosotros no te vendimos eso");
      }
    } else {
      alert("no hay ventas");
    }
  };

  const handleReport = (e) => {
    totalVentas();
  };

  return (
    <div>
      <h2>VENTAS</h2>
      <select
        onChange={handleChange}
        name="materialesId"
        value={data.materialesId}
      >
        <option value="">Seleccione</option>
        {materiales.length &&
          materiales.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>

      <label>CANTIDAD</label>
      <input
        name="amount"
        value={data.amount}
        type="text"
        onChange={handleChange}
      />

      <button onClick={handleClick}>Aceptar</button>

      <h2>DEVOLUCIONES</h2>

      <select
        onChange={handleReturn}
        name="materialesId"
        value={date.materialesId}
      >
        <option value="">Seleccione</option>
        {materiales.length &&
          materiales.map((element) => (
            <option key={element.id} value={element.id}>
              {element.name}
            </option>
          ))}
      </select>

      <label>DEVOLUCION</label>
      <input
        name="amount"
        value={date.amount}
        type="text"
        onChange={handleReturn}
      />

      <button onClick={handleSubmit}>Aceptar</button>

      <h2>REPORTE DE VENTAS</h2>
      <button onClick={handleReport}>Aceptar</button>
    </div>
  );
}
