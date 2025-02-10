import React, { useState, useEffect } from "react";
import "./App.css";
import Welcome from "./components/Welcome/Welcome.tsx";
import Lista from "./components/Lista/Lista.tsx";
import { Contato } from "./types/Contato.ts";

function App() {
  const [contatos, setContatos] = useState<Contato[]>([]);

  useEffect(() => {
    const contatosSalvos = localStorage.getItem("contatos");
    if (contatosSalvos) {
      setContatos(JSON.parse(contatosSalvos));
    }
  }, []);

  const handleNovoContato = (contato: Contato) => {
    const novosContatos = [...contatos, contato];
    setContatos(novosContatos);
    localStorage.setItem("contatos", JSON.stringify(novosContatos));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Welcome onNovoContato={handleNovoContato} />
        <Lista contatos={contatos} setContatos={setContatos} />
      </div>
    </div>
  );
}

export default App;
