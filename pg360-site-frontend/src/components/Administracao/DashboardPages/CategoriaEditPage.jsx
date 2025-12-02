import React, { useEffect, useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar"; 

function CategoriaEditPage({ onSelect }) {
  const [categorias, setCategorias] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Erro ao buscar categorias:", err));
  }, []);

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/categorias/${selected.cdCategoria}`, selected)
      .then(() => {
        alert("Categoria atualizada com sucesso!");
      })
      .catch(err => console.error("Erro ao atualizar categoria:", err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full">

        {/* Botão de voltar minimalista */}
        <div className="mb-4">
          <BotaoVoltar onSelect={onSelect} destino="categorias-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Editar Categoria
        </h2>

        <label className="block text-sm font-semibold text-gray-700 mb-1">Selecione uma Categoria</label>
        <select
          className="w-full border p-3 rounded-xl mb-6 focus:ring-2 focus:ring-[#1D91CE] outline-none"
          onChange={e => {
            const cat = categorias.find(c => c.cdCategoria === parseInt(e.target.value));
            setSelected(cat);
          }}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map(cat => (
            <option key={cat.cdCategoria} value={cat.cdCategoria}>{cat.nmCategoria}</option>
          ))}
        </select>

        {selected && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nome da Categoria</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                value={selected.nmCategoria}
                onChange={e => setSelected({ ...selected, nmCategoria: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                value={selected.dsCategoria}
                onChange={e => setSelected({ ...selected, dsCategoria: e.target.value })}
              />
            </div>

            <button
              className="w-full bg-[#1D91CE] text-white px-4 py-3 rounded-xl shadow-lg hover:bg-[#219EBC] transition font-bold font-poppins"
              onClick={handleUpdate}
            >
              Atualizar Categoria
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriaEditPage;
