import React, { useState, useEffect } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar";
import { AlertCircle, CheckCircle, Loader2, X } from "lucide-react"; 

function LocalCreatePage({ onSelect }) {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const [form, setForm] = useState({
    nmLocal: "",
    dsLocal: "",
    endereco: "",
    latitude: "",
    longitude: "",
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
    axios.get("http://localhost:8080/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => showToast("error", "Erro ao carregar categorias."));
  }, []);

  const handleSubmit = () => {
    setLoading(true);

    if (!form.nmLocal.trim()) {
      showToast("error", "O nome do local é obrigatório.");
      setLoading(false);
      return;
    }
    if (!form.endereco.trim()) {
      showToast("error", "O endereço é obrigatório.");
      setLoading(false);
      return;
    }
    if (!form.categoria.cdCategoria) {
      showToast("error", "Selecione uma categoria.");
      setLoading(false);
      return;
    }

    const payload = {
      ...form,
      latitude: form.latitude ? parseFloat(form.latitude.replace(',', '.')) : null,
      longitude: form.longitude ? parseFloat(form.longitude.replace(',', '.')) : null,
      categoria: { cdCategoria: parseInt(form.categoria.cdCategoria) }
    };

    axios.post("http://localhost:8080/locais", payload)
      .then(() => {
        showToast("success", "Local cadastrado com sucesso!");
        setForm({
          nmLocal: "", dsLocal: "", endereco: "",
          latitude: "", longitude: "",
          categoria: { cdCategoria: "" }, imagens: []
        });
      })
      .catch(err => {
        console.error("Erro técnico:", err);
        if (err.response) {
            const msg = err.response.data?.message || "Erro interno ao salvar.";
            showToast("error", msg);
        } else {
            showToast("error", "Sem conexão com o servidor.");
        }
      })
      .finally(() => setLoading(false));
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
            <BotaoVoltar onSelect={onSelect} destino="locais-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">Cadastrar Local</h2>

        <div className="space-y-4">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700">Nome do Local <span className="text-red-500">*</span></label>
            <input 
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none transition-colors"
              value={form.nmLocal}
              onChange={e => setForm({...form, nmLocal: e.target.value})}
              placeholder="Ex: Praça das Cabeças"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Endereço <span className="text-red-500">*</span></label>
            <input 
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              value={form.endereco}
              onChange={e => setForm({...form, endereco: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Categoria <span className="text-red-500">*</span></label>
            <select 
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none bg-white"
              value={form.categoria.cdCategoria}
              onChange={e => setForm({...form, categoria: {cdCategoria: e.target.value}})}
            >
              <option value="">Selecione...</option>
              {categorias.map(cat => (
                <option key={cat.cdCategoria} value={cat.cdCategoria}>{cat.nmCategoria}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700">Latitude</label>
                <input 
                  className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#1D91CE]"
                  placeholder="-24.000"
                  type="text"
                  value={form.latitude}
                  onChange={e => setForm({...form, latitude: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700">Longitude</label>
                <input 
                  className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#1D91CE]"
                  placeholder="-46.000"
                  type="text"
                  value={form.longitude}
                  onChange={e => setForm({...form, longitude: e.target.value})}
                />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Imagem (URL)</label>
            <input 
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none"
              value={form.imagens[0] || ""}
              onChange={e => setForm({...form, imagens: [e.target.value]})}
              placeholder="https://..."
            />
          </div>

          <button 
            className={`w-full text-white px-4 py-3 rounded-xl shadow-lg transition font-bold font-poppins flex justify-center items-center
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1D91CE] hover:bg-[#219EBC]'}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Cadastrar Local"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LocalCreatePage;