import React, { useEffect, useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar"; 

function LocalEditPage({ onSelect }) {
  const [locais, setLocais] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/locais").then(res => setLocais(res.data));
    axios.get("http://localhost:8080/categorias").then(res => setCategorias(res.data));
  }, []);

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/locais/${selected.cdLocal}`, selected)
      .then(() => {
        alert("Local atualizado com sucesso!");
      })
      .catch(err => console.error("Erro ao atualizar local:", err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full">

        {/* Botão de voltar minimalista */}
        <div className="mb-4">
          <BotaoVoltar onSelect={onSelect} destino="locais-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Editar Local
        </h2>

        <label className="block text-sm font-semibold text-gray-700 mb-1">Selecione um Local</label>
        <select
          className="w-full border p-3 rounded-xl mb-6 focus:ring-2 focus:ring-[#1D91CE] outline-none"
          onChange={e => {
            const loc = locais.find(l => l.cdLocal === parseInt(e.target.value));
            setSelected(loc);
          }}
        >
          <option value="">Selecione um local</option>
          {locais.map(loc => (
            <option key={loc.cdLocal} value={loc.cdLocal}>{loc.nmLocal}</option>
          ))}
        </select>

        {selected && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do Local</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                value={selected.nmLocal}
                onChange={e => setSelected({ ...selected, nmLocal: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                value={selected.dsLocal}
                onChange={e => setSelected({ ...selected, dsLocal: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Endereço</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                value={selected.endereco}
                onChange={e => setSelected({ ...selected, endereco: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Latitude</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                value={selected.latitude}
                onChange={e => setSelected({ ...selected, latitude: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Longitude</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                value={selected.longitude}
                onChange={e => setSelected({ ...selected, longitude: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Horário de Funcionamento</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                value={selected.hrFuncionamento}
                onChange={e => setSelected({ ...selected, hrFuncionamento: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
              <select
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                value={selected.categoria?.cdCategoria || ""}
                onChange={e => setSelected({ ...selected, categoria: { cdCategoria: e.target.value } })}
              >
                <option value="">Selecione uma Categoria</option>
                {categorias.map(cat => (
                  <option key={cat.cdCategoria} value={cat.cdCategoria}>{cat.nmCategoria}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Imagem do Local (URL)</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                placeholder="https://exemplo.com/imagem.jpg"
                value={selected.imagens?.[0] || ""}
                onChange={e => setSelected({ ...selected, imagens: [e.target.value] })}
              />
            </div>

            <button
              className="w-full bg-[#1D91CE] text-white px-4 py-3 rounded-xl shadow-lg hover:bg-[#219EBC] transition font-bold font-poppins"
              onClick={handleUpdate}
            >
              Atualizar Local
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocalEditPage;
