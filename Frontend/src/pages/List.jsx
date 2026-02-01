import { useState } from "react"
import Table from "../components/list/Table"

const List = () => {
  const [activeFilter, setActiveFilter] = useState("todos")

  return (
    <div className="space-y-6 ">
        <div>
            <h1 className="font-black text-4xl text-[#6B4F3A]">Listado de Mascotas</h1>
            <hr className="border-[#E0D9D1] my-2" />
            <p className="mb-8 text-[#7A6A58]">
                Administra las mascotas registradas en el sistema desde este módulo.
            </p>
        </div>
      

      {/* Filtros */}
      <div className="flex gap-2 bg-white p-1 rounded-2xl border-slate-200 shadow w-fit">
        <button
          onClick={() => setActiveFilter("todos")}
          className={`px-6 py-2 rounded-xl text-sm ${
            activeFilter === "todos"
              ? "bg-primary text-white bg-[#b19772]"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          Todos
        </button>

        <button
          onClick={() => setActiveFilter("activo")}
          className={`px-6 py-2 rounded-xl text-sm flex gap-2 items-center ${
            activeFilter === "activo"
              ? "bg-primary text-white bg-[#b19772]"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${activeFilter === "activo" ? "bg-white" : "bg-emerald-500"}`} />
          Activo
        </button>

        <button
          onClick={() => setActiveFilter("inactivo")}
          className={`px-6 py-2 rounded-xl text-sm flex gap-2 items-center ${
            activeFilter === "inactivo"
              ? "bg-primary text-white bg-[#b19772]"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${activeFilter === "inactivo" ? "bg-white" : "bg-slate-400"}`} />
          Inactivo
        </button>
      </div>

      <Table filter={activeFilter} />
    </div>
  )
}

export default List
