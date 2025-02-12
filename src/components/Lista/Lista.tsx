import React, { useEffect, useState } from "react";
import { Contato } from "../../types/Contato.ts";
import Modal from "../Utils/Modal/Modal.tsx";

interface ListaProps {
  contatos: Contato[];
  onDeletarContato: (index: number) => void;
}

const Lista = ({ contatos, onDeletarContato }: ListaProps) => {
  const [contatoSelecionado, setContatoSelecionado] = useState<Contato | null>(
    null
  );
  const [modalAberto, setModalAberto] = useState(false);

  const abrirWhatsapp = (telefone: string) => {
    const numeroLimpo = telefone.replace(/\D/g, "");
    window.open(`https://wa.me/55${numeroLimpo}`, "_blank");
  };

  const abrirModal = (contato: Contato) => {
    setContatoSelecionado(contato);
    setModalAberto(true);
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
                <button
                  onClick={() => abrirModal(contato)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  title="Visualizar detalhes"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
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
                  onClick={() => onDeletarContato(index)}
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

      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        {contatoSelecionado && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Detalhes do Contato
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Nome:</span>{" "}
                {contatoSelecionado.nome}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">E-mail:</span>{" "}
                {contatoSelecionado.email}
              </p>
              <div className="space-y-1">
                <p className="font-semibold text-gray-600">Telefones:</p>
                <ul className="list-disc list-inside">
                  {contatoSelecionado.telefones.map((telefone, index) => (
                    <li
                      key={index}
                      className="text-gray-600 flex items-center gap-2"
                    >
                      {telefone}
                      <button
                        onClick={() => abrirWhatsapp(telefone)}
                        className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition-colors"
                        title="Abrir no WhatsApp"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Lista;
