import { useEffect, useState } from "react"
import PetList from "../components/pets/PetList.jsx"
import PetForm from "../components/pets/PetForm.jsx"
import PetEdit from "../components/pets/PetEdit.jsx"
import { useFetch } from "../hooks/useFetch.js"

const Pet = () => {
    const fetchDataBackend = useFetch()

    const user = JSON.parse(localStorage.getItem("user"))
    console.log("ESTE ES EL USUARIO", user)
    if (!user) return <p>Cargando usuario...</p>
    
    const rol = user?.roles?.[0]
    const isAdmin = rol === "ADMINISTRADOR"
    const isOwner = rol === "DUEÑO"
    const ownerId = isOwner ? user?._id : null

    const [activeView, setActiveView] = useState("listar")
    const [pets, setPets] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (activeView === "listar" ) {
            fetchPets()
        }
    }, [activeView])

    const fetchPets = async () => {
        try {
            setLoading(true)
            const auth = JSON.parse(localStorage.getItem("auth-token"))
            const token = auth?.state?.token
            let url = ""
            if (isAdmin){
                url = `${import.meta.env.VITE_BACKEND_URL}/v1/pet/pets`
            } else if (isOwner){
                url = `${import.meta.env.VITE_BACKEND_URL}/v1/pet/get-pet/${ownerId}`
            } else {
                setPets([])
            }
            const data = await fetchDataBackend(
            url,
            null,
            "GET",
            {
                Authorization: `Bearer ${token}`
            }
            )

            setPets(Array.isArray(data) ? data : [])

        } catch (error) {
            console.error("Error al obtener mascotas:", error)
            setPets([])
        } finally {
            setLoading(false)
        }
    }

    console.log(pets)

  return (
  <div className="space-y-6">
    {/* HEADER */}
    <div>
        <h1 className="font-black text-4xl text-[#6B4F3A]">
            {isAdmin ? "Administrar Mascotas" : "Mis Mascotas"}
        </h1>
        <hr className="border-[#E0D9D1] my-2" />
        <p className="text-[#7A6A58]">
            {isAdmin
            ? "Gestiona las mascotas registradas en el sistema."
            : "Administra la información de tus mascotas."}
        </p>
    </div>

    {/* BOTONES */}
    <div className="flex gap-2 bg-white p-1 rounded-2xl shadow w-fit">
        {/* Listar Mascotas */}
        <button
            onClick={() => setActiveView("listar")}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition
                ${activeView === "listar"
                ? "bg-[#b19772] text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
        >
            {isAdmin ? "Ver Mascotas" : "Ver mis Mascotas"}
        </button>

        {/* Registrar una nueva mascota */}
        {isOwner || isAdmin && (
        <button
            onClick={() => setActiveView("crear")}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition
                ${activeView === "crear"
                ? "bg-[#b19772] text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
        >
            Registra una nueva Mascota
        </button>
        )}

        {/* Actualizar la actividad de una mascota */}
        {isOwner &&(
            <button
                onClick={() => setActiveView("editar")}
                className={`px-6 py-2 rounded-xl text-sm font-semibold transition
                    ${activeView === "editar"
                    ? "bg-[#b19772] text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
            >
                Registra Actividades de tu Mascota
            </button>
        )
    }
    </div>

    {/* CONTENIDO */}
        {activeView === "crear" && <PetForm />}
        {activeView === "listar" && <PetList pets={pets} loading={loading} />}
        {activeView === "editar" && <PetEdit/>}
    </div>
  )
}

export default Pet
