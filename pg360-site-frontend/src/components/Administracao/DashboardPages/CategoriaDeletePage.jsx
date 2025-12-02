import React, { useEffect, useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar"; 

function CategoriaDeletePage({ onSelect }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Erro ao buscar categorias:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/categorias/${id}`);
      alert("Categoria excluída com sucesso!");
      setCategorias(prev => prev.filter(c => c.cdCategoria !== id));
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("Esta categoria não pode ser excluída porque está vinculada a um evento ou local.");
      } else {
        alert("Erro ao excluir categoria. Verifique se ela está em uso.");
      }
      console.error("Erro ao excluir categoria:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-2xl w-full">

        <div className="mb-4">
          <BotaoVoltar onSelect={onSelect} destino="categorias-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Excluir Categoria
        </h2>

        <ul className="space-y-4">
          {categorias.map(cat => (
            <li key={cat.cdCategoria} className="p-4 border rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{cat.nmCategoria}</h3>
                <p className="text-sm text-gray-600">{cat.dsCategoria}</p>
              </div>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-xl shadow hover:bg-red-700 transition font-bold font-poppins"
                onClick={() => handleDelete(cat.cdCategoria)}
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

export default CategoriaDeletePage;
