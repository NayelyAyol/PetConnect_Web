import {create} from 'zustand';
import axios from 'axios';
import {toast} from 'react-toastify'

// Vamos a obtener el token desde localStorage
const getAuthHeaders = () => {
    const storedUser = JSON.parse(localStorage.getItem("auth-token"))
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser?.state?.token}`,
        },
    }
}

// Método para obtener la información del perfil 

const storeProfile = create((set) => ({
        
    user: null,
    clearUser: () => set({ user: null }),
    // Petición
    profile: async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/v1/auth/profile`

            console.log("TOKEN ENVIADO:" , getAuthHeaders());
            const respuesta = await axios.get(url, getAuthHeaders())
            set({ user: respuesta.data })
        } catch (error) {
            console.error(error)
        }
    },
    // Actualizar perfil dentro de perfil
    updateProfile: async (url, data) => {
        try{
            const respuesta = await axios.patch(url, data, getAuthHeaders()) 
            set({user: respuesta.data})
            toast.success("Perfil actualizado correctamente")
        }catch (error){
            console.log(error)
            toast.error(error.response?.data?.msg)
        }
    }
    ,
    // Actualizar contraseña dentro de perfil
    updatePasswordProfile:async(url,data)=>{
        try {
            const respuesta = await axios.post(url, data, getAuthHeaders())
            console.log(respuesta.data)
            return true
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg)
            return false
        }
    }
    })
)

export default storeProfile;