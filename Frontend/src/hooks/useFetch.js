import axios from "axios";
import { toast } from "react-toastify";

export function useFetch() {
  // para hacer las peticiones al backend
  const fetchDataBackend = async (
    url,
    data = null,
    method = "GET",
    headers = {},
    showToast = true,
  ) => {
    const toastId = `${method}:${url}`;
    let loadingToast;
    if (showToast && !toast.isActive(toastId)) {
      loadingToast = toast.loading("Procesando solicitud...", { toastId });
    }

    try {
      const options = {
        method,
        url,
        headers: {
          ...headers,
        },
      };

      if (data !== null && method !== "DELETE") {
        options.headers["Content-Type"] = "application/json";
        options.data = data;
      }

      const response = await axios(options);
      if (showToast) {
        toast.dismiss(toastId); // Elimina

        if (response?.data?.msg)
          toast.success(response?.data?.msg, { toastId: toastId + "success" }); // respuesta del backend
        return response?.data;
      }
    } catch (error) {
      if (showToast) {
        toast.dismiss(toastId);
        toast.error(error.response?.data?.msg || "Error", {
          toastId: toastId + "error",
        }); // Manda la respuesta en una notificación
      }
    }
  };
  return fetchDataBackend;
}
