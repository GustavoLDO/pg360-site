import React, { useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar"; 

function CategoriaCreatePage({ onSelect }) {
  const [form, setForm] = useState({
    nmCategoria: "",
    dsCategoria: ""
  });

  const handleSubmit = () => {
    axios.post("http://localhost:8080/categorias", form)
      .then(() => {
        alert("Categoria cadastrada com sucesso!");
        setForm({ nmCategoria: "", dsCategoria: "" });
      })
      .catch(err => console.error("Erro ao cadastrar categoria:", err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full">

        {/* Botão de voltar minimalista */}
        <div className="mb-4">
          <BotaoVoltar onSelect={onSelect} destino="categorias-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Cadastrar Categoria
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome da Categoria
            </label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              placeholder="Digite o nome da categoria"
              value={form.nmCategoria}
              onChange={e => setForm({ ...form, nmCategoria: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Descrição
            </label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              placeholder="Digite a descrição"
              value={form.dsCategoria}
              onChange={e => setForm({ ...form, dsCategoria: e.target.value })}
            />
          </div>

          <button
            className="w-full bg-[#1D91CE] text-white px-4 py-3 rounded-xl shadow-lg hover:bg-[#219EBC] transition font-bold font-poppins"
            onClick={handleSubmit}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoriaCreatePage;
