import { Router } from "express";
import { verificarTokenJWT } from "../../../core/middleware/JWT.js";
import { getDashboardStats } from "../../Dashboard/DashboardController.js";

const router = Router();
const url = "/routes/dashboard/";

// Ruta protegida (solo ADMINISTRADOR)
router.get(
    url + "stats",
    verificarTokenJWT(["ADMINISTRADOR"]),
    getDashboardStats
);

export default router;
