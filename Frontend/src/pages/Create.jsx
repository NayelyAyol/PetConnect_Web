import Form from "../components/create/Form.jsx";

const Create = () => {
    return (
        <div>
            <div>
                <h1 className="font-black text-4xl text-[#6B4F3A]">Agregar Mascotas</h1>
                <hr className="border-[#E0D9D1] my-2" />
                <p className="mb-8 text-[#7A6A58]">
                Registra nuevas mascotas en Torres el Pedregal
                </p>
            </div>
            <Form />
        </div>
    )
}

export default Create