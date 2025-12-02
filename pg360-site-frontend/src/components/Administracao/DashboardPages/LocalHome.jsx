import React from "react";
import { PlusCircle, ListOrdered, Pencil, Trash2 } from "lucide-react";
import BotaoVoltar from "./BotaoVoltar";

function LocalHome({ onSelect }) {
  const botoes = [
    { chave: "locais-create", label: "Cadastrar", icon: <PlusCircle className="w-6 h-6 mb-2" /> },
    { chave: "locais-list", label: "Listar", icon: <ListOrdered className="w-6 h-6 mb-2" /> },
    { chave: "locais-edit", label: "Editar", icon: <Pencil className="w-6 h-6 mb-2" /> },
    { chave: "locais-delete", label: "Excluir", icon: <Trash2 className="w-6 h-6 mb-2" /> },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full">
        <BotaoVoltar onSelect={onSelect} destino="home" cor="text-[#1D91CE]" />

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Gerenciar Locais
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {botoes.map(btn => (
            <button
              key={btn.chave}
              onClick={() => onSelect(btn.chave)}
              className="flex flex-col items-center justify-center bg-[#1D91CE] text-white px-6 py-6 rounded-xl shadow-lg hover:bg-[#219EBC] transition font-bold font-poppins"
            >
              {btn.icon}
              <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LocalHome;
