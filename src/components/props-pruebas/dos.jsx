import React from "react";
import Final from "./final";

export default function Dos(props) {
  const numero1 = props.num1;
  const numero2 = 100;
  return (
    <>
      <h1>Componente DOS = {numero2}</h1>
      <Final num1={numero1} num2={numero2} />;
    </>
  );
}
