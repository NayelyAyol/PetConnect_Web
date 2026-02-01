import { Link, Outlet } from "react-router";

// Rutas privadas
import storeAuth from "../context/storeAuth";
import storeProfile from "../context/storeProfile";

import { useEffect } from "react";

const Dashboard = () => {
  const { clearToken } = storeAuth();

  const {user, profile, clearUser} = storeProfile();

  useEffect(() => {
    profile();
  }, []);

  return (
    <div className="md:flex md:min-h-screen bg-gray-100">
      
      {/* SIDEBAR */}
      <aside
        className="border-r border-gray-300 flex flex-col justify-between bg-[#fff7e0] w-full md:w-61"
      >
        <div>
          {/* LOGO */}
          <h2 className="text-4xl font-extrabold text-center text-[#b19671] mt-9">
            PetConnect
          </h2>

          {/* USER INFO */}
          <div className="flex flex-col items-center mt-6">
            <img
              src={
                user?.info_personal?.avatar_url ||
                "https://cdn-icons-png.flaticon.com/128/847/847969.png"
              }
              alt="Usuario"
              className="w-30 h-30 rounded-full object-cover rounded-full border-2 border-[#675b4c] "
            />

            <p className="text-gray-600 mt-3 text-sm">
              <span className="font-semibold"></span>
              Bienvenido - {user?.info_personal?.nombre || "Usuario"}
            </p>

            <p className="text-gray-400 text-xs">Rol: {user?.roles?.[0] || "Sin rol"}</p>
          </div>

          {/* MENU */}
          <nav className="mt-8 space-y-3 px-4">

            {/* INICIO */}
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition `}
            >
              <span className="text-lg">🏠</span>
              Inicio
            </Link>

            {/* PERFIL */}
            <Link
              to="/dashboard/profile"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition}`}
            >
              <span className="text-lg">👤</span>
              Perfil
            </Link>

            {/* AVATARES */}
            <Link
              to="/dashboard/avatars"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition `}
            >
              <span className="text-lg">🖼️</span>
              Avatares
            </Link>

            {/* Módulo de Mascotas */}
            <Link
              to="/dashboard/pet"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition `}
            >
              <span className="text-lg">🐾</span>
              Mascotas
            </Link>

            
            {/* <Link
              to="/dashboard/list"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition  ${
                urlActual === "/dashboard/list"
                  ? "bg-[#b19772]/80 text-black shadow"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className="text-lg">📄</span>
              Listar
            </Link> */}
            

            
            {/* <Link
              to="/dashboard/create"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                urlActual === "/dashboard/create"
                  ? "bg-[#b19772]/80 text-black shadow"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className="text-lg">➕</span>
              Crear
            </Link> */}
            

            {/* CHAT 
            <Link
              to="/dashboard/chat"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                urlActual === "/dashboard/chat"
                  ? "bg-[#f7f2b0] text-black shadow"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span className="text-lg">💬</span>
              Chat
            </Link>
            */}

          </nav>
        </div>

        {/* SALIR */}
        <div className="p-4 border-t border-gray-300">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-[#674c4c] hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm"
            onClick={() =>{
              clearUser();
              clearToken();
            }}
          >
            🚪 Cerrar sesión
          </Link>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col bg-[#fffdf5]">
        
        {/* HEADER */}
        <header className="flex items-center px-6 py-3 border-b bg-white">
          <span className="text-lg text-[#5a5a5a]">
            Dashboard
          </span>
          {urlActual !== "/dashboard" && (
            <>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-lg text-[#b19671] font-semibold">
              </span>
            </>
          )}

          {/*
          <div className="flex items-center gap-4">
            <button className="relative text-2xl">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              🔔
            </button>
            
            <img
              src={
                user?.foto ||
                "https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
              }
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-green-500"
            />
            
          </div>
          */}
        </header>

        {/* CONTENIDO */}
        <main className="flex-1 overflow-y-auto p-6 space-y-10">
          <Outlet />
        </main>

        <footer className="bg-white border-t py-3 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PetConnect. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
