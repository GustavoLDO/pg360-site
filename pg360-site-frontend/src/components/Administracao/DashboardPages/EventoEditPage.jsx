import React, { useEffect, useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar";

function EventoEditPage({ onSelect }) {
  const [eventos, setEventos] = useState([]);
  const [locais, setLocais] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/eventos").then(res => setEventos(res.data));
    axios.get("http://localhost:8080/locais").then(res => setLocais(res.data));
    axios.get("http://localhost:8080/categorias").then(res => setCategorias(res.data));
  }, []);

  const handleUpdate = () => {
    axios.put(`http://localhost:8080/eventos/${selected.cdEvento}`, selected)
      .then(() => {
        alert("Evento atualizado com sucesso!");
      })
      .catch(err => console.error("Erro ao atualizar evento:", err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full">

        {/* Botão de voltar minimalista */}
        <div className="mb-4">
          <BotaoVoltar onSelect={onSelect} destino="eventos-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Editar Evento
        </h2>

        {/* Seleção do evento */}
        <label className="block text-sm font-semibold text-gray-700 mb-1">Selecione um Evento</label>
        <select
          className="w-full border p-3 rounded-xl mb-6 focus:ring-2 focus:ring-[#1D91CE] outline-none"
          onChange={e => {
            const ev = eventos.find(ev => ev.cdEvento === parseInt(e.target.value));
            setSelected(ev);
          }}
        >
          <option value="">Selecione um evento</option>
          {eventos.map(ev => (
            <option key={ev.cdEvento} value={ev.cdEvento}>{ev.nmEvento}</option>
          ))}
        </select>

        {selected && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do Evento</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                value={selected.nmEvento}
                onChange={e => setSelected({ ...selected, nmEvento: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                value={selected.dsEvento}
                onChange={e => setSelected({ ...selected, dsEvento: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Data de Início</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                type="date"
                value={selected.dtInicioEvento}
                onChange={e => setSelected({ ...selected, dtInicioEvento: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Data de Fim</label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                type="date"
                value={selected.dtFimEvento}
                onChange={e => setSelected({ ...selected, dtFimEvento: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Local</label>
              <select
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                value={selected.local?.cdLocal || ""}
                onChange={e => setSelected({ ...selected, local: { cdLocal: e.target.value } })}
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">Imagem do Evento (URL)</label>
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
              Atualizar Evento
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventoEditPage;
