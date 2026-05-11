"use client";

import { useSyncExternalStore } from "react";

/**
 * Hook que devuelve `true` cuando el componente está montado en el cliente.
 * Usa useSyncExternalStore (React 18+) para evitar el error de lint
 * "Calling setState synchronously within an effect" en React 19.
 */
const emptySubscribe = () => () => {};

export function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
