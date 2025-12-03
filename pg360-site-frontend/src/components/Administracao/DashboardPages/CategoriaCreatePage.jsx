import React, { useState } from "react";
import axios from "axios";
import BotaoVoltar from "./BotaoVoltar";
import { AlertCircle, CheckCircle, Loader2, X } from "lucide-react";

function CategoriaCreatePage({ onSelect }) {
  const [form, setForm] = useState({
    nmCategoria: "",
    dsCategoria: ""
  });

  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const showToast = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleSubmit = () => {
    setLoading(true);

    if (!form.nmCategoria.trim()) {
      showToast("error", "O nome da categoria é obrigatório.");
      setLoading(false);
      return;
    }

    if (form.dsCategoria.length > 255) {
      showToast("error", "A descrição não pode ter mais de 255 caracteres.");
      setLoading(false);
      return;
    }

    axios.post("http://localhost:8080/categorias", form)
      .then(() => {
        showToast("success", "Categoria cadastrada com sucesso!");
        setForm({ nmCategoria: "", dsCategoria: "" });
      })
      .catch(err => {
        console.error("Erro técnico:", err);

        if (err.response) {
          const msg = err.response.data?.message || err.response.data;
          showToast("error", typeof msg === 'string' ? msg : "Erro interno no servidor.");
        } else if (err.request) {
          showToast("error", "Sem conexão com o servidor.");
        } else {
          showToast("error", "Erro desconhecido.");
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
          <BotaoVoltar onSelect={onSelect} destino="categorias-home" cor="text-[#1D91CE]" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-[#1D91CE] text-center font-outfit">
          Cadastrar Categoria
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nome da Categoria <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#1D91CE]"
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
            <p className="text-xs text-gray-400 text-right mt-1">
              {form.dsCategoria.length}/255
            </p>
          </div>

          <button
            className={`w-full text-white px-4 py-3 rounded-xl shadow-lg transition font-bold font-poppins flex justify-center items-center
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1D91CE] hover:bg-[#219EBC]'}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Cadastrar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoriaCreatePage;