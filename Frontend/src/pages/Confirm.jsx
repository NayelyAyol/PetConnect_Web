import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useFetch } from "../hooks/useFetch";

export const Confirm = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const fetchDataBackend = useFetch();

  const [loading, setLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Evita que el useEffect se ejecute más de una vez
  const hasRun = useRef(false);

  useEffect(() => {
    if (!token || hasRun.current) return;
    hasRun.current = true;

    const verifyToken = async () => {
      if (!token) {
        setErrorMessage("Token no proporcionado");
        setLoading(false);
        return;
      }

      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/v1/auth/confirm/${token}`;
        const response = await fetchDataBackend(url, null, "GET"); // GET al backend

        if (response?.msg) {
          setIsConfirmed(true);
          toast.success(response.msg); // mensaje del backend

          // Redirigir al login después de 3 segundos
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 5000);

        } else {
          setErrorMessage("No se pudo confirmar tu cuenta.");
          toast.error("No se pudo confirmar tu cuenta. Intenta de nuevo.");
        }
      } catch (error) {
        const msg = error?.message || "Error al confirmar la cuenta";
        setErrorMessage(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, fetchDataBackend, navigate]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#fff7e0" }}
      >
        <p className="text-lg text-gray-500">Confirmando tu cuenta...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ backgroundColor: "#fff7e0" }}
    >
      <ToastContainer />
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 text-center">
            <div className="mb-6 flex justify-center">
            </div>

            <h1 className="text-4xl font-bold" style={{ color: "#b19671ff" }}>
              PETCONNECT
            </h1>

            {isConfirmed ? (
              <>
                <h2 className="text-2xl font-bold mt-6">¡Bienvenido a PetConnect!</h2>
                <p className="text-gray-500 mt-4">{errorMessage || "Tu cuenta ha sido confirmada exitosamente. Ya puedes iniciar sesión y comenzar a disfrutar de todas las funcionalidades."}</p>

                <div className="mt-8 space-y-3">
                  <Link
                    to="/login"
                    className="block w-full text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all text-center"
                    style={{ backgroundColor: "#b19671ff" }}
                  >
                    Iniciar Sesión
                  </Link>

                  <Link
                    to="/"
                    className="block w-full text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all text-center border-2 border-gray-300"
                  >
                    Volver al Inicio
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mt-6">Ups...</h2>
                <p className="text-gray-500 mt-4">{errorMessage || "No se pudo confirmar tu cuenta."}</p>
                <div className="mt-8">
                  <Link
                    to="/"
                    className="block w-full text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all text-center"
                    style={{ backgroundColor: "#b19671ff" }}
                  >
                    Volver al Inicio
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
