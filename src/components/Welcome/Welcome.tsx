import React, { useState } from "react";
import AdicionarContato from "../AdicionarContato.tsx";
import Botao from "../Utils/Botao/Botao.tsx";

const Welcome = () => {
  const [showAdcContato, setShowAdcContato] = useState(false);

  const handleShowAdcContato = () => {
    setShowAdcContato(!showAdcContato);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-4">
        Bem-vindo ao nosso sistema
      </h1>
      <div className="flex justify-center mb-4">
        <Botao onClick={handleShowAdcContato}>
          {showAdcContato ? "← Voltar" : "Adicionar contato"}
        </Botao>
      </div>
      {showAdcContato && <AdicionarContato onNovoContato={() => {}} />}
    </div>
  );
};
export default Welcome;
