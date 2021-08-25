import React from "react";
import Dos from "../props-pruebas/dos";

export default function Uno() {
  const numero1 = 50;
  return (
    <>
      <h2>Componente UNO = {numero1}</h2>
      <Dos num1={numero1} />
    </>
  );
}
