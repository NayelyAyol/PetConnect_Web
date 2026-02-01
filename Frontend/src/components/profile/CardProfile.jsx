import storeProfile from "../../context/storeProfile.jsx";
import { useState, useEffect, useRef } from "react";
import { MdCameraAlt, MdCloudUpload, MdCheckCircle, MdSave, MdClose } from "react-icons/md";
import { useFetch } from "../../hooks/useFetch.js";
import { toast } from "react-toastify";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/128/847/847969.png";

export const CardProfile = () => {
    const { user, profile } = storeProfile();
    const fetchDataBackend = useFetch();

    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(user?.info_personal?.avatar_url || DEFAULT_AVATAR);
    const [loading, setLoading] = useState(false);

    const toastShown = useRef(false)

    // Manejo de selección de imagen
    const handleSelectImage = (file) => {
        setSelectedImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    // Subir imagen al backend
    const handleUploadImage = async () => {
        if (!selectedImage) return;

        setLoading(true);
        const reader = new FileReader();

        reader.onload = async () => {
            const base64String = reader.result;
            const storedUser = JSON.parse(localStorage.getItem("auth-token"));

            const response = await fetchDataBackend(
                `${import.meta.env.VITE_BACKEND_URL}/v1/user/avatar`,
                { avatar_base64: base64String }, // enviar como JSON
                "POST",
                {
                    Authorization: `Bearer ${storedUser.state.token}`,
                }
            );

            if (response) {
                toast.success("Avatar actualizado correctamente");
                await profile();
                setPreviewImage(response.urlAvatar || DEFAULT_AVATAR);
            }
            setLoading(false);
            setSelectedImage(null)
            setIsUploadingImage(false)
        };

        reader.readAsDataURL(selectedImage);
    };

    // Función para formatear fecha ISO a DD/MM/YYYY
    const formatFecha = (fechaISO) => {
        if (!fechaISO) return "";
        const [year, month, day] = fechaISO.split("T")[0].split("-");
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        setPreviewImage(user?.info_personal?.avatar_url || DEFAULT_AVATAR);
    }, [user?.info_personal?.avatar_url]);


    return (
        <div className="bg-[#FAF7F2] border border-[#E0D9D1] p-6 rounded-xl shadow-md">
            <div className="relative w-36 h-36 mx-auto">
                <img
                    src={previewImage || user?.info_personal?.avatar_url || DEFAULT_AVATAR}
                    alt="Avatar usuario"
                    className="w-full h-full rounded-full object-cover shadow-lg border-3 border-white"
                />
                <button
                    onClick={() => setIsUploadingImage(prev => !prev)}
                    className={`absolute bottom-0 right-0 p-3 rounded-full text-white shadow-lg bg-[#6B4F3A] hover:bg-[#8C6F55] transition-transform transform hover:scale-110`}
                    title="Cambiar avatar"
                >
                    <MdCameraAlt size={20} />
                </button>
            </div>

            {isUploadingImage && (
                <div className="mt-4 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-center animate-fade-in">
                    <label className="flex flex-col items-center cursor-pointer">
                        <MdCloudUpload className="text-gray-300 text-3xl mb-2" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {selectedImage ? "Imagen seleccionada" : "Elegir archivo"}
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleSelectImage(e.target.files[0])}
                        />
                    </label>

                    {selectedImage && (
                        <button
                            onClick={handleUploadImage}
                            disabled={loading}
                            className="mt-4 w-full py-2.5 bg-[#b19671] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#8e785a] transition-all shadow-md active:scale-95 disabled:opacity-50"
                        >
                            <MdCheckCircle /> {loading ? "Subiendo..." : "Subir Imagen"}
                        </button>
                    )}
                </div>
            )}
            <div className="space-y-2 text-[#6B4F3A]">
                <p><b>Nombre:</b> <span className="ml-2 text-[#7A6A58]">{user?.info_personal?.nombre}</span></p>
                <p><b>Apellido:</b> <span className="ml-2 text-[#7A6A58]">{user?.info_personal?.apellido}</span></p>
                <p><b>Dirección:</b> <span className="ml-2 text-[#7A6A58]">{user?.info_personal?.direccion_principal?.calle}</span></p>
                <p><b>Celular:</b> <span className="ml-2 text-[#7A6A58]">{user?.info_personal?.telefono}</span></p>
                <p><b>Correo:</b> <span className="ml-2 text-[#7A6A58]">{user?.email}</span></p>
                <p><b>Fecha de Nacimiento:</b> <span className="ml-2 text-[#7A6A58]">{formatFecha(user?.info_personal?.fecha_nacimiento)}</span></p>
            </div>

        </div>
    );
};
