// ============================================================
// FAST PAGE PRO — Wrapper para lista de categorías con eliminación
// Conecta el componente personalizado con la estructura de Sanity
// ============================================================

import React from "react";
import DeletableList from "./DeletableList";
import { TagIcon, PackageIcon } from "@sanity/icons";

// Wrapper que ignora los props de Sanity Structure y pasa los correctos
export function CategoryListWithDelete() {
  return React.createElement(DeletableList, {
    schemaType: "category",
    title: "Categorías",
    icon: React.createElement(TagIcon),
  });
}

export function ProductListWithDelete() {
  return React.createElement(DeletableList, {
    schemaType: "product",
    title: "Productos",
    icon: React.createElement(PackageIcon),
  });
}
