// src/components/Administracao/DashboardPages/BotaoVoltar.jsx
import React from "react";
import { ArrowLeftCircle } from "lucide-react";

function BotaoVoltar({ onSelect, destino, cor = "text-blue-600" }) {
  return (
    <button
      onClick={() => onSelect(destino)}
      className={`flex items-center justify-center ${cor} hover:opacity-80 transition`}
    >
      <ArrowLeftCircle className="w-10 h-10" />
    </button>
  );
}

export default BotaoVoltar;
