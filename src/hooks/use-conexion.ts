import { useEffect, useRef, useState } from "react";
import { marcarSincronizados } from "@/lib/ops-store";

export type EstadoConexion = "conectado" | "sin-conexion" | "sincronizando" | "sincronizado";

export function useConexion() {
  const [estado, setEstado] = useState<EstadoConexion>("conectado");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const online = () => {
      setEstado("sincronizando");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        marcarSincronizados();
        setEstado("sincronizado");
        timer.current = setTimeout(() => setEstado("conectado"), 4000);
      }, 1800);
    };
    const offline = () => {
      if (timer.current) clearTimeout(timer.current);
      setEstado("sin-conexion");
    };

    setEstado(navigator.onLine ? "conectado" : "sin-conexion");
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);
    return () => {
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const sincronizar = () => {
    if (!navigator.onLine) {
      setEstado("sin-conexion");
      return;
    }
    setEstado("sincronizando");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      marcarSincronizados();
      setEstado("sincronizado");
      timer.current = setTimeout(() => setEstado("conectado"), 4000);
    }, 1500);
  };

  return { estado, sincronizar };
}
