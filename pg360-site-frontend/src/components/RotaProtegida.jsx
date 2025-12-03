import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RotaProtegida = () => {
    // 1. Verifica se existe a "chave" de acesso no navegador
    const usuarioEstaLogado = localStorage.getItem("adminLogado") === "true";

    // 2. Se estiver logado, deixa passar (Outlet renderiza a página solicitada)
    // 3. Se não, chuta de volta para a tela de login (Navigate)
    return usuarioEstaLogado ? <Outlet /> : <Navigate to="/entrar" replace />;
};

export default RotaProtegida;