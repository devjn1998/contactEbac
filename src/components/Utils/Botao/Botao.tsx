import { ReactElement } from "react";

interface BotaoProps {
  onClick: () => void;
  children: ReactElement | string;
}

const Botao = ({ onClick, children }: BotaoProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      {children}
    </button>
  );
};

export default Botao;
