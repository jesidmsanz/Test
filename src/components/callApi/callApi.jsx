import React, { useState, useEffect } from "react";

export default function CallApi() {
  const [date, setDate] = useState([]);
  const [nomina, setNomina] = useState();
  const [identification, setIdentification] = useState({
    idnumber: "",
    dayEmployees: "",
  });
  const [bd, setBd] = useState([]);
  const [data, setData] = useState([]);

  const api = "https://backend.assiscontrol.proyectatech.com/employees";

  const getApi = async () => {
    const result = await fetch(api);
    const date = await result.json();
    let count = 0;
    date.length &&
      date.forEach((item) => (count = count + parseInt(item.dayValue, 10)));
    setNomina(count);
    setDate(date);
    setIdentification(identification);
  };

  const handleChange = (e) => {
    setIdentification({ ...identification, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    const result =
      date.length &&
      date.filter(
        (item) => item.identification == identification.idnumber && item
      );
    result[0].days = identification.dayEmployees;
    const dataa = result.concat(bd);
    setBd(dataa);
    const newData =
      dataa.length &&
      dataa.map((item) => {
        const days = parseInt(item.days, 10);
        const dayValue = parseInt(item.dayValue, 10);
        if (days === 1) {
          item.total = dayValue * days + dayValue * days * 0.15;
          return item;
        }
        if (days === 2) {
          item.total = dayValue * days + dayValue * days * 0.25;
          return item;
        }
        if (days === 3) {
          item.total = dayValue * days + dayValue * days * 0.35;
          return item;
        }
      });
    setData(newData);
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div>
      <h1>call to api employees</h1>
      <h2>Total nomina = ${nomina}</h2>
      {/* <div>
        {date.length &&
          date.map((item) => (
            <div style={{ display: "flex" }}>
              <h4>{item.fullName}</h4>
              <h4 style={{ marginLeft: "10px" }}>{item.dayValue}</h4>
            </div>
          ))}
      </div> */}
      <div>
        <h3>selecciona una identificacion</h3>
        <select
          onChange={handleChange}
          name="idnumber"
          value={identification.idnumber}
        >
          <option value="">Seleccione</option>
          {date.length &&
            date.map((item) => (
              <option key={item.id} value={item.identification}>
                {item.fullName}
              </option>
            ))}
        </select>

        <label>Numeros de dias trabajados</label>
        <input
          name="dayEmployees"
          value={identification.dayEmployees}
          type="number"
          onChange={handleChange}
        />
        <button onClick={handleClick}>Buscar</button>
      </div>

      <h2>Si trabajo 1 dia agregale un aumento del 15%</h2>
      {data.length > 0 &&
        data.map(
          (item) =>
            item.days == 1 && (
              <div style={{ display: "flex" }}>
                <h4>{item.fullName}---</h4>
                <h4>{item.dayValue}---</h4>
                <h4>{item.days}---</h4>
                <h4>{item.total}---</h4>
              </div>
            )
        )}
      <h2>Si trabajo 2 dia agregale un aumento del 25%</h2>
      {data.length > 0 &&
        data.map(
          (item) =>
            item.days == 2 && (
              <div style={{ display: "flex" }}>
                <h4>{item.fullName}---</h4>
                <h4>{item.dayValue}---</h4>
                <h4>{item.days}---</h4>
                <h4>{item.total}---</h4>
              </div>
            )
        )}
      <h2>Si trabajo 3 dia agregale un aumento del 35%</h2>
      {data.length > 0 &&
        data.map(
          (item) =>
            item.days == 3 && (
              <div style={{ display: "flex" }}>
                <h4>{item.fullName}---</h4>
                <h4>{item.dayValue}---</h4>
                <h4>{item.days}---</h4>
                <h4>{item.total}---</h4>
              </div>
            )
        )}
    </div>
  );
}
