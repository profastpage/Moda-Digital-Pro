// ============================================================
// FAST PAGE PRO — Configuración de Sanity Studio (Agencia Pro)
// Studio embebido en Next.js App Router — ruta: /admin
// Plugins: Structure + Presentation (solo 2 pestañas)
// Sin Releases, sin Vision — interfaz limpia para el cliente
// Reutilizable: lee COMPANY_NAME desde variable de entorno
// Incluye: Lista personalizada con botón X para eliminar documentos
// ============================================================

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { defineLocations } from "sanity/presentation";
import {
  PackageIcon,
  HomeIcon,
  CogIcon,
  BookIcon,
  TagIcon,
} from "@sanity/icons";
import { schemaTypes } from "./sanity/schema";
import {
  STUDIO_TITLE,
  SITE_URL,
  BRAND_COLORS,
} from "./sanity/lib/schema-master";
import DeletableList from "./sanity/plugins/DeletableList";
import { CategoryListWithDelete, ProductListWithDelete } from "./sanity/plugins/ListWrappers";
import React from "react";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "95d9zjqb";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "moda-digital-pro-studio",
  title: STUDIO_TITLE,

  projectId,
  dataset,

  // ── Studio embebido en /admin (no subdominio) ──
  basePath: "/admin",

  // ── Desactivar Releases (feature integrado de Sanity v3) ──
  releases: {
    enabled: false,
  },

  // ── Plugins (solo 2 pestañas: Estructura + Presentación) ──
  plugins: [
    // ── Pestaña 1: Structure — panel organizado en 3 grupos ──
    structureTool({
      structure: (S) => {
        return S.list()
          .title("Panel de Control")
          .items([
            // ── Grupo 1: Contenido de Tienda ──
            S.listItem()
              .title("Contenido de Tienda")
              .icon(PackageIcon)
              .id("tienda-group")
              .child(
                S.list()
                  .title("Tienda")
                  .items([
                    // Categorías — con botón X para eliminar
                    S.listItem()
                      .title("Categorías")
                      .icon(TagIcon)
                      .id("categories-list")
                      .child(
                        S.component(CategoryListWithDelete).id("category-list-pane"),
                      ),
                    // Productos — con botón X para eliminar
                    S.listItem()
                      .title("Productos")
                      .icon(PackageIcon)
                      .id("products-list")
                      .child(
                        S.component(ProductListWithDelete).id("product-list-pane"),
                      ),
                  ]),
              ),

            // ── Grupo 2: Contenido de Página ──
            S.listItem()
              .title("Contenido de Página")
              .icon(HomeIcon)
              .id("contenido-group")
              .child(
                S.list()
                  .title("Contenido")
                  .items([
                    S.listItem()
                      .title("Página Principal")
                      .icon(HomeIcon)
                      .id("home-content-editor")
                      .child(
                        S.document()
                          .schemaType("homeContent")
                          .documentId("home-content")
                          .title("Página Principal"),
                      ),
                    S.listItem()
                      .title("Configuración del Sitio")
                      .icon(CogIcon)
                      .id("site-settings-editor")
                      .child(
                        S.document()
                          .schemaType("siteSettings")
                          .documentId("siteSettings")
                          .title("Configuración"),
                      ),
                  ]),
              ),

            // ── Grupo 3: Guía de Uso ──
            S.listItem()
              .title("Guía de Uso")
              .icon(BookIcon)
              .id("guia-group")
              .child(
                S.document()
                  .schemaType("studioGuide")
                  .documentId("studio-guide")
                  .title("Guía Paso a Paso"),
              ),
          ]);
      },
    }),

    // ── Pestaña 2: Presentation — web a pantalla completa ──
    // Muestra toda la web inmediatamente. El panel de documentos
    // SOLO aparece cuando el usuario selecciona un documento.
    // Sin Releases, sin Vision — interfaz limpia.
    presentationTool({
      previewUrl: {
        // URL que se carga al abrir el panel
        initial:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : SITE_URL,
        // Habilita Draft Mode para inline editing y contenido no publicado
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: {
          product: defineLocations({
            locations: [
              { title: "Productos", href: "/#productos" },
            ],
          }),
          category: defineLocations({
            locations: [
              { title: "Productos", href: "/#productos" },
            ],
          }),
          siteSettings: defineLocations({
            locations: [
              { title: "Inicio", href: "/" },
              { title: "Nosotros", href: "/#nosotros" },
            ],
          }),
          homeContent: defineLocations({
            locations: [
              { title: "Página Principal", href: "/" },
              { title: "Productos", href: "/#productos" },
              { title: "Servicios", href: "/#servicios" },
              { title: "Nosotros", href: "/#nosotros" },
              { title: "FAQ", href: "/#faq" },
              { title: "Contacto", href: "/#contacto" },
            ],
          }),
        },
      },
    }),
  ],

  // ── Esquemas ──
  schema: {
    types: schemaTypes,
  },

  // ── Form builder: auto-save habilitado ──
  // Sanity Studio v3 guarda drafts automáticamente.
  // Las imágenes se suben al asset store y se vinculan al documento
  // sin necesidad de recargar la página ni navegar a otra pestaña.
  form: {
    image: {
      directUploads: true,
    },
  },

  // ── Tema del Studio (branding dinámico) ──
  theme: {
    "--brand-primary": BRAND_COLORS.primary,
    "--brand-accent": BRAND_COLORS.accent,
    "--brand-dark": BRAND_COLORS.dark,
  } as React.CSSProperties,
});
