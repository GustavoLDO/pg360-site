import React, { useState } from "react";
import { CalendarDays, MapPin, Tags, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import EventoHome from "./DashboardPages/EventoHome";
import LocalHome from "./DashboardPages/LocalHome";
import CategoriaHome from "./DashboardPages/CategoriaHome";

import EventoCreatePage from "./DashboardPages/EventoCreatePage";
import EventoListPage from "./DashboardPages/EventoListPage";
import EventoEditPage from "./DashboardPages/EventoEditPage";
import EventoDeletePage from "./DashboardPages/EventoDeletePage";

import LocalCreatePage from "./DashboardPages/LocalCreatePage";
import LocalListPage from "./DashboardPages/LocalListPage";
import LocalEditPage from "./DashboardPages/LocalEditPage";
import LocalDeletePage from "./DashboardPages/LocalDeletePage";

import CategoriaCreatePage from "./DashboardPages/CategoriaCreatePage";
import CategoriaListPage from "./DashboardPages/CategoriaListPage";
import CategoriaEditPage from "./DashboardPages/CategoriaEditPage";
import CategoriaDeletePage from "./DashboardPages/CategoriaDeletePage";

function Dashboard() {
  const [pagina, setPagina] = useState("home");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const renderConteudo = () => {
    switch (pagina) {
      case "home":
        return (
          <div className="flex items-center justify-center min-h-screen bg-[#E6F2FA] p-4 font-poppins">
            <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-[#1D91CE] flex items-center justify-center tracking-wide font-outfit">
                  Dashboard Administrativo
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                  onClick={() => setPagina("eventos-home")}
                  className="flex flex-col items-center justify-center bg-[#1D91CE] text-white px-6 py-6 rounded-xl shadow-lg hover:bg-[#219EBC] transition font-bold font-poppins"
                >
                  <CalendarDays className="w-8 h-8 mb-2" />
                  <span>Eventos</span>
                </button>

                <button
                  onClick={() => setPagina("locais-home")}
                  className="flex flex-col items-center justify-center bg-[#1D91CE] text-white px-6 py-6 rounded-xl shadow-lg hover:bg-[#219EBC] transition font-bold font-poppins"
                >
                  <MapPin className="w-8 h-8 mb-2" />
                  <span>Locais</span>
                </button>

                <button
                  onClick={() => setPagina("categorias-home")}
                  className="flex flex-col items-center justify-center bg-[#1D91CE] text-white px-6 py-6 rounded-xl shadow-lg hover:bg-[#219EBC] transition font-bold font-poppins"
                >
                  <Tags className="w-8 h-8 mb-2" />
                  <span>Categorias</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center bg-red-600 text-white px-6 py-6 rounded-xl shadow-lg hover:bg-red-700 transition font-bold font-poppins"
                >
                  <LogOut className="w-8 h-8 mb-2" />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </div>
        );

      case "eventos-home": return <EventoHome onSelect={setPagina} />;
      case "locais-home": return <LocalHome onSelect={setPagina} />;
      case "categorias-home": return <CategoriaHome onSelect={setPagina} />;

      case "eventos-create": return <EventoCreatePage onSelect={setPagina} />;
      case "eventos-list": return <EventoListPage onSelect={setPagina} />;
      case "eventos-edit": return <EventoEditPage onSelect={setPagina} />;
      case "eventos-delete": return <EventoDeletePage onSelect={setPagina} />;

      case "locais-create": return <LocalCreatePage onSelect={setPagina} />;
      case "locais-list": return <LocalListPage onSelect={setPagina} />;
      case "locais-edit": return <LocalEditPage onSelect={setPagina} />;
      case "locais-delete": return <LocalDeletePage onSelect={setPagina} />;

      case "categorias-create": return <CategoriaCreatePage onSelect={setPagina} />;
      case "categorias-list": return <CategoriaListPage onSelect={setPagina} />;
      case "categorias-edit": return <CategoriaEditPage onSelect={setPagina} />;
      case "categorias-delete": return <CategoriaDeletePage onSelect={setPagina} />;

      default: return null;
    }
  };

  return (
    <main className="flex-grow bg-gray-100 overflow-y-auto">
      {renderConteudo()}
    </main>
  );
}

export default Dashboard;
