import React, { useEffect, useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar"; 

function LocalCreatePage({ onSelect }) {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nmLocal: "",
    dsLocal: "",
    endereco: "",
    latitude: "",
    longitude: "",
    hrFuncionamento: "",
    categoria: { cdCategoria: "" },
    imagens: []
  });

  useEffect(() => {
    axios.get("http://localhost:8080/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Erro ao buscar categorias:", err));
  }, []);

  const handleSubmit = () => {
    axios.post("http://localhost:8080/locais", form)
      .then(() => {
        alert("Local cadastrado com sucesso!");
        setForm({
          nmLocal: "",
          dsLocal: "",
          endereco: "",
          latitude: "",
          longitude: "",
          hrFuncionamento: "",
          categoria: { cdCategoria: "" },
          imagens: []
        });
      })
      .catch(err => console.error("Erro ao cadastrar local:", err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full">

        {/* Botão de voltar minimalista */}
        <div className="mb-4">
          <BotaoVoltar onSelect={onSelect} destino="locais-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Cadastrar Local
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do Local</label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              placeholder="Digite o nome"
              value={form.nmLocal}
              onChange={e => setForm({ ...form, nmLocal: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              placeholder="Digite a descrição"
              value={form.dsLocal}
              onChange={e => setForm({ ...form, dsLocal: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Endereço</label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              placeholder="Digite o endereço"
              value={form.endereco}
              onChange={e => setForm({ ...form, endereco: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Latitude</label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              placeholder="Digite a latitude"
              value={form.latitude}
              onChange={e => setForm({ ...form, latitude: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Longitude</label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              placeholder="Digite a longitude"
              value={form.longitude}
              onChange={e => setForm({ ...form, longitude: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Horário de Funcionamento</label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              placeholder="Ex: 08:00 - 18:00"
              value={form.hrFuncionamento}
              onChange={e => setForm({ ...form, hrFuncionamento: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Categoria</label>
            <select
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              value={form.categoria.cdCategoria}
              onChange={e => setForm({ ...form, categoria: { cdCategoria: e.target.value } })}
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
              value={form.imagens[0] || ""}
              onChange={e => setForm({ ...form, imagens: [e.target.value] })}
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

export default LocalCreatePage;
