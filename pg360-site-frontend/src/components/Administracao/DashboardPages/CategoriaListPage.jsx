import React, { useEffect, useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar"; 

function CategoriaListPage({ onSelect }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Erro ao buscar categorias:", err));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-2xl w-full">
        
        <div className="mb-4">
          <BotaoVoltar onSelect={onSelect} destino="categorias-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Lista de Categorias
        </h2>

        <ul className="space-y-4">
          {categorias.map(cat => (
            <li key={cat.cdCategoria} className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-lg text-gray-800">{cat.nmCategoria}</h3>
              <p className="text-sm text-gray-600">{cat.dsCategoria}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoriaListPage;
