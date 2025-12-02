import React, { useEffect, useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar";

function EventoDeletePage({ onSelect }) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/eventos")
      .then(res => setEventos(res.data))
      .catch(err => console.error("Erro ao buscar eventos:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/eventos/${id}`);
      alert("Evento excluído com sucesso!");
      setEventos(prev => prev.filter(ev => ev.cdEvento !== id));
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("Este evento não pode ser excluído porque está vinculado a um local ou categoria.");
      } else {
        alert("Erro ao excluir evento. Verifique se ele está em uso.");
      }
      console.error("Erro ao excluir evento:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-2xl w-full">

        <div className="mb-4">
          <BotaoVoltar onSelect={onSelect} destino="eventos-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Excluir Evento
        </h2>

        <ul className="space-y-4">
          {eventos.map(ev => (
            <li key={ev.cdEvento} className="p-4 border rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{ev.nmEvento}</h3>
                <p className="text-sm text-gray-600">{ev.dsEvento}</p>
                <p className="text-xs text-gray-500">
                  {ev.dtInicioEvento} até {ev.dtFimEvento}
                </p>
                <p className="text-xs text-gray-500">
                  Local: {ev.local?.nmLocal} | Categoria: {ev.categoria?.nmCategoria}
                </p>
              </div>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-xl shadow hover:bg-red-700 transition font-bold font-poppins"
                onClick={() => handleDelete(ev.cdEvento)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventoDeletePage;
