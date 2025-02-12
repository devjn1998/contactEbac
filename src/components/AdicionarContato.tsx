import React, { useState } from "react";
import { Contato } from "../types/Contato.ts";

interface AdicionarContatoProps {
  onNovoContato: (contato: Contato) => void;
}

const AdicionarContato = ({ onNovoContato }: AdicionarContatoProps) => {
  const [inputs, setInputs] = useState([""]);

  const formatarTelefone = (valor: string) => {
    // Remove tudo que não for número
    const numeroLimpo = valor.replace(/\D/g, "");

    // Limita a 11 dígitos (DDD + 9 dígitos)
    const numeroLimitado = numeroLimpo.slice(0, 11);

    // Aplica a máscara (XX) XXXXX-XXXX
    let numeroFormatado = numeroLimitado;
    if (numeroLimitado.length > 0) {
      numeroFormatado = numeroLimitado
        .replace(/^(\d{2})/, "($1) ")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }

    return numeroFormatado;
  };

  const handleChange = (index: number, value: string) => {
    const novosInputs = [...inputs];
    novosInputs[index] = formatarTelefone(value);
    setInputs(novosInputs);
  };

  const adicionarInput = () => {
    setInputs([...inputs, ""]);
  };

  const adicionarC = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const novoContato = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      telefones: inputs
        .filter((input) => input.trim() !== "")
        .map((input) => input.replace(/\D/g, "")),
    };

    onNovoContato(novoContato);

    // Limpar os campos após adicionar
    setInputs([""]);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={adicionarC} className="space-y-4">
      <div className="space-y-2">
        {inputs.map((valor, index) => (
          <input
            key={index}
            type="text"
            value={valor}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-full border p-2 rounded text-sm"
            placeholder="(DDD) 99999-9999"
            maxLength={15}
          />
        ))}
        <button
          type="button"
          onClick={adicionarInput}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors text-sm"
        >
          + Adicionar outro telefone
        </button>
      </div>
      <input
        placeholder="Nome do contato"
        className="w-full border p-2 rounded text-sm"
        type="text"
        name="nome"
        required
      />
      <input
        placeholder="E-mail"
        className="w-full border p-2 rounded text-sm"
        type="email"
        name="email"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors text-sm"
      >
        Adicionar contato
      </button>
    </form>
  );
};

export default AdicionarContato;
