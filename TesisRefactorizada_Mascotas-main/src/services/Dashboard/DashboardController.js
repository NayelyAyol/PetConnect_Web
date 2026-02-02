import Pet from "../pet/model/Pet.js";

export const getDashboardStats = async (req, res) => {
    try {
    // Totales generales
    const totalMascotas = await Pet.countDocuments();
    const disponibles = await Pet.countDocuments({ status: true });
    const adoptadas = await Pet.countDocuments({ status: false });

    // Mascotas por tipo (Perro, Gato, etc.)
    const porTipo = await Pet.aggregate([
        {
        $group: {
            _id: "$info_basica.tipo",
            cantidad: { $sum: 1 }
        }
        },
        {
        $project: {
            _id: 0,
            tipo: "$_id",
            cantidad: 1
        }
        }
    ]);

    // Mascotas por tamaño (opcional pero MUY buena gráfica)
    const porTamano = await Pet.aggregate([
        {
        $group: {
            _id: "$info_basica.tamano",
            cantidad: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            tamano: "$_id",
            cantidad: 1
        }
    }
    ]);

    res.status(200).json({
        totalMascotas,
        disponibles,
        adoptadas,
        porTipo,
        porTamano
    });

} catch (error) {
    console.error("Error dashboard:", error);
    res.status(500).json({
        msg: "Error al obtener estadísticas del dashboard"
    });
    }
};
