import React, { useEffect, useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar";

function EventoCreatePage({ onSelect }) {
  const [locais, setLocais] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nmEvento: "",
    dsEvento: "",
    dtInicioEvento: "",
    dtFimEvento: "",
    local: { cdLocal: "" },
    categoria: { cdCategoria: "" },
    imagens: []
  });

  useEffect(() => {
    axios.get("http://localhost:8080/locais").then(res => setLocais(res.data));
    axios.get("http://localhost:8080/categorias").then(res => setCategorias(res.data));
  }, []);

  const handleSubmit = () => {
    axios.post("http://localhost:8080/eventos", form)
      .then(() => {
        alert("Evento cadastrado com sucesso!");
        setForm({
          nmEvento: "",
          dsEvento: "",
          dtInicioEvento: "",
          dtFimEvento: "",
          local: { cdLocal: "" },
          categoria: { cdCategoria: "" },
          imagens: []
        });
      })
      .catch(err => console.error("Erro ao cadastrar evento:", err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full">

        {/* Botão de voltar minimalista */}
        <div className="mb-4">
          <BotaoVoltar onSelect={onSelect} destino="eventos-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Cadastrar Evento
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do Evento</label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              placeholder="Digite o nome"
              value={form.nmEvento}
              onChange={e => setForm({ ...form, nmEvento: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              placeholder="Digite a descrição"
              value={form.dsEvento}
              onChange={e => setForm({ ...form, dsEvento: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Data de Início</label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              type="date"
              value={form.dtInicioEvento}
              onChange={e => setForm({ ...form, dtInicioEvento: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Data de Fim</label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              type="date"
              value={form.dtFimEvento}
              onChange={e => setForm({ ...form, dtFimEvento: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Local</label>
            <select
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              value={form.local.cdLocal}
              onChange={e => setForm({ ...form, local: { cdLocal: e.target.value } })}
            >
              <option value="">Selecione um Local</option>
              {locais.map(loc => (
                <option key={loc.cdLocal} value={loc.cdLocal}>{loc.nmLocal}</option>
              ))}
            </select>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">Imagem do Evento (URL)</label>
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

export default EventoCreatePage;
