import React from "react";

export default function Final(props) {
  return (
    <div>
      <h1>React</h1>
      <h2>
        Resultado de componente UNO + componente DOS = {props.num1 + props.num2}
      </h2>
    </div>
  );
}
