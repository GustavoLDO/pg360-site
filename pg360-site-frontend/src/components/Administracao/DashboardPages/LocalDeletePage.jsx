import React, { useEffect, useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar"; 

function LocalDeletePage({ onSelect }) {
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/locais")
      .then(res => setLocais(res.data))
      .catch(err => console.error("Erro ao buscar locais:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/locais/${id}`);
      alert("Local excluído com sucesso!");
      setLocais(prev => prev.filter(l => l.cdLocal !== id));
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("Este local não pode ser excluído porque está vinculado a um evento.");
      } else {
        alert("Erro ao excluir local. Verifique se ele está em uso.");
      }
      console.error("Erro ao excluir local:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-2xl w-full">

        <div className="mb-4">
          <BotaoVoltar onSelect={onSelect} destino="locais-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Excluir Local
        </h2>

        <ul className="space-y-4">
          {locais.map(loc => (
            <li key={loc.cdLocal} className="p-4 border rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{loc.nmLocal}</h3>
                <p className="text-sm text-gray-600">{loc.dsLocal}</p>
                <p className="text-xs text-gray-500">{loc.endereco}</p>
                <p className="text-xs text-gray-500">Categoria: {loc.categoria?.nmCategoria}</p>
              </div>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-xl shadow hover:bg-red-700 transition font-bold font-poppins"
                onClick={() => handleDelete(loc.cdLocal)}
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

export default LocalDeletePage;
