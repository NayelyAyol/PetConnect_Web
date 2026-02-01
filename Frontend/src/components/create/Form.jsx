import { useState } from "react";
import {
  MdAutoAwesome,
  MdCloudUpload,
  MdPets,
  MdPerson,
} from "react-icons/md";

const Form = () => {
  const [stateAvatar, setStateAvatar] = useState({
    generatedImage: "https://cdn-icons-png.flaticon.com/512/2138/2138440.png",
    prompt: "",
    loading: false,
  });

  const [selectedOption, setSelectedOption] = useState("ia");

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <form className="space-y-8">

        {/* ================= INFO PROPIETARIO ================= */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <div className="bg-[#fff7e0] p-2 rounded-lg">
              <MdPerson className="text-[#b19671] text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-black">
              Información del Propietario
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Cédula 
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Cédula de Identidad
              </label>

              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    placeholder="Ej: 1726354410"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200
                               focus:ring-2 focus:ring-[#f7f2b0]
                               focus:border-[#b19671] outline-none transition-all"
                  />
                  <MdSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                </div>

                <button
                  type="button"
                  className="px-6 py-2.5 bg-[#675b4c] text-white rounded-xl
                             font-semibold hover:bg-[#4a4136]
                             transition-colors shadow-md active:scale-95"
                >
                  Consultar
                </button>
              </div>
            </div>
            */}

            {/* Nombres */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200
                           focus:ring-2 focus:ring-[#f7f2b0]
                           focus:border-[#b19671] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Apellido
              </label>
              <input
                type="text"
                placeholder="Apellido"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200
                           focus:ring-2 focus:ring-[#f7f2b0]
                           focus:border-[#b19671] outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="usuario@correo.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200
                           focus:ring-2 focus:ring-[#f7f2b0]
                           focus:border-[#b19671] outline-none"
              />
            </div>

            {/* Celular */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Celular
              </label>
              <input
                type="tel"
                placeholder="099-999-9999"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200
                           focus:ring-2 focus:ring-[#f7f2b0]
                           focus:border-[#b19671] outline-none"
              />
            </div>
          </div>
        </section>

        {/* ================= INFO MASCOTA ================= */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <div className="bg-[#fff7e0] p-2 rounded-lg">
              <MdPets className="text-[#b19671] text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              Información de la Mascota
            </h2>
          </div>

          <div className="space-y-6">

            {/* Nombre mascota */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Nombre de la Mascota
              </label>
              <input
                type="text"
                placeholder="¿Cómo se llama?"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200
                           focus:ring-2 focus:ring-[#f7f2b0]
                           focus:border-[#b19671] outline-none"
              />
            </div>

            {/* Selector imagen */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4">
                Imagen de Identidad
              </label>

              <div className="flex p-1 bg-gray-100 rounded-xl w-fit mb-6">
                <button
                  type="button"
                  onClick={() => setSelectedOption("ia")}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedOption === "ia"
                      ? "bg-white shadow text-[#b19671]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <MdAutoAwesome /> Generar con IA
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOption("upload")}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedOption === "upload"
                      ? "bg-white shadow text-[#b19671]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <MdCloudUpload /> Subir Imagen
                </button>
              </div>

              {selectedOption === "ia" ? (
                <div className="bg-[#fff7e0]/30 p-6 rounded-2xl border-2 border-dashed
                                border-[#f7f2b0] flex flex-col md:flex-row
                                items-center gap-6">
                  <div className="flex-1 w-full">
                    <p className="text-xs text-[#b19671] font-bold uppercase mb-2">
                      Prompt de generación
                    </p>

                    <input
                      type="text"
                      placeholder="Ej: Un gato siamés con traje de astronauta..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none mb-3"
                      value={stateAvatar.prompt}
                      onChange={(e) =>
                        setStateAvatar((prev) => ({
                          ...prev,
                          prompt: e.target.value,
                        }))
                      }
                    />

                    <button
                      type="button"
                      className="w-full py-2 bg-[#b19671] text-white rounded-xl font-bold
                                 hover:bg-[#8e785a] transition-all
                                 flex items-center justify-center gap-2"
                    >
                      <MdAutoAwesome /> Generar Avatar
                    </button>
                  </div>

                  <div className="relative">
                    <img
                      src={stateAvatar.generatedImage}
                      alt="Preview"
                      className="w-32 h-32 rounded-2xl object-cover shadow-lg
                                 border-4 border-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="group relative border-2 border-dashed border-gray-200
                                rounded-2xl p-8 transition-all hover:border-[#b19671]
                                flex flex-col items-center justify-center
                                bg-gray-50 cursor-pointer">
                  <MdCloudUpload className="text-4xl text-gray-300 group-hover:text-[#b19671] mb-2" />
                  <p className="text-sm text-gray-500 font-medium">
                    Click para subir o arrastra la imagen
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= BOTÓN ================= */}
        <button
          type="submit"
          className="w-full py-4 bg-[#674c4c] text-white text-lg font-bold
                     rounded-2xl shadow-xl hover:bg-[#4a3636]
                     transition-all transform hover:-translate-y-1
                     active:scale-95 uppercase tracking-wider"
        >
          Confirmar Registro
        </button>
      </form>
    </div>
  );
};

export default Form;
