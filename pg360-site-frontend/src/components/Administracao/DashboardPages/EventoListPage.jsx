import React, { useEffect, useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar";

function EventoListPage({ onSelect }) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/eventos")
      .then(res => setEventos(res.data))
      .catch(err => console.error("Erro ao listar eventos:", err));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-2xl w-full">
        
        <div className="mb-4">
          <BotaoVoltar onSelect={onSelect} destino="eventos-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Lista de Eventos
        </h2>
        
        <ul className="space-y-4">
          {eventos.map(ev => (
            <li key={ev.cdEvento} className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-lg text-gray-800">{ev.nmEvento}</h3>
              <p className="text-sm text-gray-600">{ev.dsEvento}</p>
              <p className="text-xs text-gray-500">Início: {ev.dtInicioEvento} | Fim: {ev.dtFimEvento}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventoListPage;
