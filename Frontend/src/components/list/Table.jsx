import { useState } from "react"
import { MdDeleteForever, MdInfo, MdPublishedWithChanges } from "react-icons/md"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

const Table = ({ filter }) => {
    const [currentPage, setCurrentPage] = useState(1)

    const pets = [
        { id: 1, name: "Luna", owner: "Carlos Pérez", email: "carlos@email.com", phone: "0987654321", status: "activo", avatar: "🐾" },
        { id: 2, name: "Max", owner: "Ana Gómez", email: "ana@email.com", phone: "0991234567", status: "activo", avatar: "🐾" },
        { id: 3, name: "Rocky", owner: "Luis Torres", email: "luis@email.com", phone: "0982345678", status: "inactivo", avatar: "🐾" },
        { id: 4, name: "Bella", owner: "María Ruiz", email: "maria@email.com", phone: "0971456789", status: "activo", avatar: "🐾" },
    ]

    const filteredPets = filter === "todos" ? pets : pets.filter(pet => pet.status === filter)

    const itemsPerPage = 4
    const totalPages = Math.ceil(filteredPets.length / itemsPerPage)
    const startIdx = (currentPage - 1) * itemsPerPage
    const paginatedPets = filteredPets.slice(startIdx, startIdx + itemsPerPage)

    return (
        <div>
            {/* CONTENEDOR ÚNICO */}
            <div className="overflow-x-auto rounded-xl shadow-md border border-[#b19772]/20 bg-white">

                {/* TABLA */}
                <table className="w-full">
                    <thead className="bg-[#b19772] text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase">N°</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase">Mascota</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase">Propietario</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase">Celular</th>
                            <th className="px-6 py-4 text-left text-xs font-bold uppercase">Estado</th>
                            <th className="px-6 py-4 text-center text-xs font-bold uppercase">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#b19772]/10">
                        {paginatedPets.map((pet, idx) => (
                            <tr key={pet.id} className="">
                                <td className="px-6 py-5 text-[#b19772]/70 font-bold text-sm">
                                    0{startIdx + idx + 1}
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-15 h-15 rounded-full bg-[#b19772]/20 flex items-center justify-center text-[#b19772] font-bold">
                                            {pet.avatar}
                                        </div>
                                        <span className="text-[#171512] font-bold text-sm">
                                            {pet.name}
                                        </span>
                                    </div>
                                </td>

                                <td className="px-6 py-5 text-sm text-[#171512]">{pet.owner}</td>
                                <td className="px-6 py-5 text-sm text-[#b19772]/80">{pet.email}</td>
                                <td className="px-6 py-5 text-sm text-[#b19772]/80">{pet.phone}</td>

                                <td className="px-6 py-5">
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                                        pet.status === "activo"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-gray-100 text-gray-600"
                                    }`}>
                                        <span className={`w-2 h-2 rounded-full ${
                                            pet.status === "activo" ? "bg-emerald-500" : "bg-gray-400"
                                        }`} />
                                        {pet.status === "activo" ? "Activo" : "Inactivo"}
                                    </span>
                                </td>

                                <td className="px-6 py-5">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-2 text-[#b19772] hover:bg-[#b19772]/10 rounded-lg">
                                            <MdInfo className="h-5 w-5" />
                                        </button>
                                        <button className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg">
                                            <MdPublishedWithChanges className="h-5 w-5" />
                                        </button>
                                        <button className="p-2 text-red-500 hover:bg-red-100 rounded-lg">
                                            <MdDeleteForever className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
            {/* PAGINACIÓN */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#b19772]/20 ">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#b19772]/60">
                        Mostrando 1 a {Math.min(itemsPerPage, filteredPets.length)} de {filteredPets.length} mascotas
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 text-[#b19772] hover:bg-[#b19772]/10 rounded-lg disabled:opacity-40"
                        >
                            <FiChevronLeft />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 rounded-lg font-bold ${
                                    currentPage === page
                                        ? "bg-[#b19772] text-white"
                                        : "text-[#171512] hover:bg-[#b19772]/10"
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 text-[#b19772] hover:bg-[#b19772]/10 rounded-lg disabled:opacity-40"
                        >
                            <FiChevronRight />
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default Table
