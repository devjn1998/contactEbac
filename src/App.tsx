import React, { useState, useEffect } from "react";
import "./App.css";
import Welcome from "./components/Welcome/Welcome.tsx";
import Lista from "./components/Lista/Lista.tsx";
import { Contato } from "./types/Contato.ts";

function App() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [showAdcContato, setShowAdcContato] = useState(false);

  useEffect(() => {
    const contatosSalvos = localStorage.getItem("contatos");
    if (contatosSalvos) {
      setContatos(JSON.parse(contatosSalvos));
    }
  }, []);

  const handleNovoContato = (contato: Contato) => {
    setContatos((prevContatos) => {
      const novosContatos = [...prevContatos, contato];
      localStorage.setItem("contatos", JSON.stringify(novosContatos));
      return novosContatos;
    });
    setShowAdcContato(false);
  };

  const handleDeletarContato = (index: number) => {
    setContatos((prevContatos) => {
      const novosContatos = prevContatos.filter((_, i) => i !== index);
      localStorage.setItem("contatos", JSON.stringify(novosContatos));
      return novosContatos;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Welcome
          onNovoContato={handleNovoContato}
          showAdcContato={showAdcContato}
          setShowAdcContato={setShowAdcContato}
        />
        <Lista contatos={contatos} onDeletarContato={handleDeletarContato} />
      </div>
    </div>
  );
}

export default App;
