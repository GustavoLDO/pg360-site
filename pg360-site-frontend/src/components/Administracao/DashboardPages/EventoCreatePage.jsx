import React, { useEffect, useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar";
import { AlertCircle, CheckCircle, Loader2, X } from "lucide-react";

function EventoCreatePage({ onSelect }) {
  const [locais, setLocais] = useState([]);
  const [categorias, setCategorias] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [form, setForm] = useState({
    nmEvento: "",
    dsEvento: "",
    dtInicioEvento: "",
    dtFimEvento: "",
    local: { cdLocal: "" },
    categoria: { cdCategoria: "" },
    imagens: []
  });

  const showToast = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    axios.get("http://localhost:8080/locais")
      .then(res => setLocais(res.data))
      .catch(err => showToast("error", "Não foi possível carregar a lista de locais."));

    axios.get("http://localhost:8080/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => showToast("error", "Não foi possível carregar a lista de categorias."));
  }, []);

  const handleSubmit = () => {
    setLoading(true);

    if (!form.nmEvento.trim()) {
      showToast("error", "O nome do evento é obrigatório.");
      setLoading(false);
      return;
    }

    if (!form.dtInicioEvento) {
      showToast("error", "A data de início é obrigatória.");
      setLoading(false);
      return;
    }

    // --- NOVA VALIDAÇÃO DE DATA FIM ---
    if (!form.dtFimEvento) {
      showToast("error", "A data de fim é obrigatória.");
      setLoading(false);
      return;
    }

    if (form.dtFimEvento < form.dtInicioEvento) {
      showToast("error", "A data de fim não pode ser anterior à data de início.");
      setLoading(false);
      return;
    }

    if (!form.local.cdLocal) {
      showToast("error", "Por favor, selecione um Local para o evento.");
      setLoading(false);
      return;
    }

    if (!form.categoria.cdCategoria) {
      showToast("error", "Por favor, selecione uma Categoria.");
      setLoading(false);
      return;
    }

    const imgUrl = form.imagens[0];
    if (imgUrl && !imgUrl.startsWith("http")) {
       showToast("error", "A URL da imagem parece inválida.");
       setLoading(false);
       return;
    }

    const payload = {
      ...form,
      local: { cdLocal: parseInt(form.local.cdLocal) },
      categoria: { cdCategoria: parseInt(form.categoria.cdCategoria) }
    };

    axios.post("http://localhost:8080/eventos", payload)
      .then(() => {
        showToast("success", "Evento cadastrado com sucesso!");
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
      .catch(err => {
        console.error("Erro técnico:", err);
        if (err.response) {
            const msg = err.response.data?.message || err.response.data || "Erro ao salvar evento.";
            showToast("error", typeof msg === 'string' ? msg : JSON.stringify(msg));
        } else {
            showToast("error", "Sem conexão com o servidor.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins relative">
      
      {notification && (
        <div className={`
            fixed top-5 right-5 z-50 flex items-center p-4 rounded-lg shadow-2xl transition-all duration-500 transform translate-y-0
            ${notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
        `}>
            {notification.type === 'success' ? <CheckCircle className="mr-2" /> : <AlertCircle className="mr-2" />}
            <span className="font-bold mr-4">{notification.message}</span>
            <button onClick={() => setNotification(null)} className="hover:opacity-75">
                <X size={18} />
            </button>
        </div>
      )}

      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full">

        <div className="mb-4">
          <BotaoVoltar onSelect={onSelect} destino="eventos-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Cadastrar Evento
        </h2>
        
        <div className="space-y-4">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome do Evento <span className="text-red-500">*</span>
            </label>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Data Início <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                type="date"
                value={form.dtInicioEvento}
                onChange={e => setForm({ ...form, dtInicioEvento: e.target.value })}
              />
            </div>

            <div>
              {/* ADICIONEI O ASTERISCO VERMELHO AQUI */}
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Data Fim <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
                type="date"
                value={form.dtFimEvento}
                onChange={e => setForm({ ...form, dtFimEvento: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Local <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none bg-white"
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Categoria <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none bg-white"
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
              placeholder="https://..."
              value={form.imagens[0] || ""}
              onChange={e => setForm({ ...form, imagens: [e.target.value] })}
            />
          </div>

          <button
            className={`w-full text-white px-4 py-3 rounded-xl shadow-lg transition font-bold font-poppins flex justify-center items-center
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1D91CE] hover:bg-[#219EBC]'}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Cadastrar Evento"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventoCreatePage;