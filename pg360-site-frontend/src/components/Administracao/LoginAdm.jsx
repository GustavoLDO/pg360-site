import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { LogIn, User, Lock, XCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

function Login(usuario, senha) {
  const username = "admin";
  const password = "admin123";

  if (usuario === username && senha === password) {
    return { success: true, message: "Acesso permitido! Bem-vindo." };
  } else {
    return { success: false, message: "Credenciais inválidas. Tente novamente." };
  }
}

function LoginAdm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [statusMessage, setStatusMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const onSubmit = (data) => {
    setStatusMessage(null);
    const resultado = Login(data.usuario, data.senha);
    setStatusMessage(resultado.message);
    setIsSuccess(resultado.success);

    if (resultado.success) {
      console.log("Login OK! Usuário logado.");
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins"> 
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-sm w-full">

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#1D91CE] flex items-center justify-center tracking-wide font-outfit">
            Acesso Administrativo
          </h1>
        </div>

        {/* Mensagem de status */}
        {statusMessage && (
          <div className={`px-4 py-3 rounded-xl mb-6 flex items-center shadow-inner ${isSuccess ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
            {isSuccess ? <CheckCircle className="w-5 h-5 mr-3" /> : <XCircle className="w-5 h-5 mr-3" />}
            <span className="block sm:inline font-medium text-sm">{statusMessage}</span>
          </div>
        )}
        
        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Usuário */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="usuario">Usuário</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="usuario"
                type="text"
                {...register("usuario", { required: "O nome de usuário é obrigatório" })}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none ${errors.usuario ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.usuario && <p className="mt-1 text-xs font-medium text-red-600">{errors.usuario.message}</p>}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="senha">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="senha"
                type="password"
                {...register("senha", { required: "A senha é obrigatória" })}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#1D91CE] outline-none ${errors.senha ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.senha && <p className="mt-1 text-xs font-medium text-red-600">{errors.senha.message}</p>}
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-base font-bold text-white bg-[#1D91CE] hover:bg-[#219EBC] transition font-poppins"
          >
            <LogIn className="mr-3 h-5 w-5" />
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdm;
