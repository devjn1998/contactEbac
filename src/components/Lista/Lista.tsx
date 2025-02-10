import React, { useEffect, useState } from "react";
import { Contato } from "../../types/Contato.ts";

const Lista = () => {
  const [contatos, setContatos] = useState<Contato[]>([]);

  const buscarContatos = () => {
    const contatosSalvos = localStorage.getItem("contatos");
    if (contatosSalvos) {
      setContatos(JSON.parse(contatosSalvos));
    }
  };

  useEffect(() => {
    buscarContatos();
  }, []);

  const deletarContato = (index: number) => {
    const novosContatos = contatos.filter((_, i) => i !== index);
    setContatos(novosContatos);
    localStorage.setItem("contatos", JSON.stringify(novosContatos));
  };

  const handleNovoContato = (contato: Contato) => {
    const novosContatos = [...contatos, contato];
    setContatos(novosContatos);
    localStorage.setItem("contatos", JSON.stringify(novosContatos));
  };

  const abrirWhatsapp = (telefone: string) => {
    const numeroLimpo = telefone.replace(/\D/g, "");
    window.open(`https://wa.me/55${numeroLimpo}`, "_blank");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-4 md:mb-6">
        Lista de Contatos
      </h1>
      <div className="overflow-x-auto">
        <ul className="min-w-full bg-white rounded-lg">
          <li className="flex justify-between bg-blue-500 text-white p-3 rounded-t-lg font-semibold text-sm md:text-base">
            <span className="w-1/5 text-center">Telefone</span>
            <span className="w-1/5 text-center">Nome</span>
            <span className="w-1/5 text-center hidden md:block">E-mail</span>
            <span className="w-2/5 text-center">Ações</span>
          </li>
          {contatos.map((contato, index) => (
            <li
              key={index}
              className="flex justify-between p-3 border-b hover:bg-gray-50 text-sm md:text-base"
            >
              <span className="w-1/5 text-center text-gray-600 truncate">
                {contato.telefones?.join(", ")}
              </span>
              <span className="w-1/5 text-center font-medium truncate">
                {contato.nome}
              </span>
              <span className="w-1/5 text-center text-blue-600 hidden md:block truncate">
                {contato.email}
              </span>
              <span className="w-2/5 flex justify-center gap-1 md:gap-2">
                {contato.telefones?.map((telefone, telIndex) => (
                  <button
                    key={telIndex}
                    onClick={() => abrirWhatsapp(telefone)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                    title="Abrir no WhatsApp"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </button>
                ))}
                <button
                  onClick={() => deletarContato(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  title="Deletar contato"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lista;
