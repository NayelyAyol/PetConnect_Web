import { useEffect } from "react"
import storeProfile from "../../context/storeProfile"
import { useForm } from "react-hook-form"
import { ToastContainer } from "react-toastify"

const FormProfile = () => {

    const {user, updateProfile} = storeProfile()
    const {register, handleSubmit, reset, formState:{errors}} = useForm()

    const updateUser = (dataForm) =>{
        const data = {
            nombre: dataForm.nombre,
            apellido: dataForm.apellido,
            telefono: dataForm.celular,
            direccion_principal: {
                calle: dataForm.calle,
                ciudad: dataForm.ciudad
            },
            fecha_nacimiento: dataForm.fechaNacimiento,
        }
        const url = `${import.meta.env.VITE_BACKEND_URL}/v1/user/update/info-personal`
        updateProfile(url, data)
    }

    useEffect(() => {
        if(user){
            reset({
                nombre: user?.info_personal?.nombre,
                apellido: user?.info_personal?.apellido,
                calle: user?.info_personal?.direccion_principal?.calle,
                ciudad: user?.info_personal?.direccion_principal?.ciudad,
                celular: user?.info_personal?.telefono,
                email: user?.email
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <form className="bg-[#FAF7F2] border border-[#E0D9D1] p-6 rounded-xl shadow-md" onSubmit={handleSubmit(updateUser)}>
            <ToastContainer />

            <h2 className="text-2xl font-semibold text-[#6B4F3A] mb-4">Editar Datos Personales</h2>

            <div>
                <label className="mb-2 block text-sm font-semibold text-[#6B4F3A]">Nombre</label>
                <input 
                    type="text"
                    placeholder="Ingresa tu nombre"
                    className="block w-full rounded-md border border-[#DBCDBF] bg-white py-2 px-3 text-[#7A6A58] mb-5"
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                />
                {errors.nombre && <p className="text-red-800">{errors.nombre.message}</p>}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-[#6B4F3A]">Apellido</label>
                <input 
                    type="text"
                    placeholder="Ingresa tu apellido"
                    className="block w-full rounded-md border border-[#DBCDBF] bg-white py-2 px-3 text-[#7A6A58] mb-5"
                    {...register("apellido", { required: "El apellido es obligatorio" })}
                />
                {errors.apellido && <p className="text-red-800">{errors.apellido.message}</p>}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-[#6B4F3A]">Calle</label>
                <input 
                    type="text"
                    placeholder="Ingresa la calle donde vives"
                    className="block w-full rounded-md border border-[#DBCDBF] bg-white py-2 px-3 text-[#7A6A58] mb-5"
                    {...register("calle", { required: "La calle es obligatoria" })}
                />
                {errors.calle && <p className="text-red-800">{errors.calle.message}</p>}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-[#6B4F3A]">Ciudad</label>
                <input 
                    type="text"
                    placeholder="Ingresa la ciudad donde vives"
                    className="block w-full rounded-md border border-[#DBCDBF] bg-white py-2 px-3 text-[#7A6A58] mb-5"
                    {...register("ciudad", { required: "La ciudad es obligatoria" })}
                />
                {errors.ciudad && <p className="text-red-800">{errors.ciudad.message}</p>}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-[#6B4F3A]">Celular</label>
                <input 
                    type="text"
                    placeholder="Ingresa tu teléfono"
                    className="block w-full rounded-md border border-[#DBCDBF] bg-white py-2 px-3 text-[#7A6A58] mb-5"
                    {...register("celular", { required: "El celular es obligatorio", pattern: { value: /^[0-9]+$/, message: "Solo se permiten números" }, maxLength: { value: 10, message: "Máximo 10 dígitos" }})}
                />
                {errors.celular && <p className="text-red-800">{errors.celular.message}</p>}
            </div>


            <div>
                <label className="mb-2 block text-sm font-semibold text-[#6B4F3A]">Fecha de Nacimiento</label>
                <input
                type="date"
                className="block w-full rounded-md border border-[#DBCDBF] bg-white py-2 px-3 text-[#7A6A58] mb-5"
                {...register("fechaNacimiento", 
                    { required: "La fecha de nacimiento es obligatoria",
                    validate: { 
                        notFutureDate: value => {
                        const selectedDate = new Date(value);
                        const today = new Date();
                        return selectedDate <= today || "La fecha de nacimiento no puede ser futura";
                        },
                    }
                })}
            />
            {errors.fechaNacimiento && <p className="text-red-800">{errors.fechaNacimiento.message}</p>}
            </div>

            <input
                type="submit"
                className="bg-[#6B4F3A] text-white w-full p-2 mt-5 uppercase font-bold rounded-lg hover:bg-[#8C6F55] cursor-pointer transition-all"
                value="Actualizar"
            />

        </form>
    )
}

export default FormProfile
