import { changePassword, checkTokenPassword, confirmMail, login, restorePassword, updatePassword } from "../../controller/AuthController.js"
import { verificarTokenJWT } from "../../../../core/middleware/JWT.js"
import { Router } from "express"
import { OAuth2Client } from "google-auth-library"

const router = Router()

const url = "/v1/auth/"

// Rutas públicas
router.post(url + "login", login)
router.post(url + "confirm/:token", confirmMail)
router.post(url + "restore-password", restorePassword)
router.post(url + "change-password/:token", changePassword)
router.post(url + "restore-password/:token", checkTokenPassword)

// Rutas privadas
router.post(
    url + "update-password/:id",
    verificarTokenJWT(["ADMINISTRADOR", "DUEÑO", "CUIDADOR"]),
    updatePassword
);

// ===================== GOOGLE LOGIN =====================

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "886407857941-9cbngh0r9napji7ltdimev56onu4ga2g.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID)

// Nueva ruta pública para login con Google
router.post(url + "google", async (req, res) => {
    const { token } = req.body 

    if (!token) return res.status(400).json({ error: "No se envió el token" })

    try {
        // Verifica el token con Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        })
        const payload = ticket.getPayload() 

        res.status(200).json({ user: payload })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: "Token inválido" })
    }
})

export default router
