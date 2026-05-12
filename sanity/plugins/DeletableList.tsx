// ============================================================
// FAST PAGE PRO — Lista de documentos con botón X para eliminar
// Componente personalizado para Sanity Studio v3
// Muestra productos/categorías con X roja → confirmación → borrar
// ============================================================

import React, { useState, useCallback, useEffect } from "react";
import { useClient } from "sanity";
import { useRouter } from "sanity/router";
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Spinner,
  Stack,
  Text,
} from "@sanity/ui";
import { type SanityDocument } from "@sanity/client";
import { PackageIcon, TagIcon, TrashIcon } from "@sanity/icons";

interface DeletableListProps {
  schemaType: string;
  title: string;
  icon?: React.ReactNode;
}

// ── Diálogo de confirmación con animación ──
function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  docTitle,
  loading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  docTitle: string;
  loading: boolean;
}) {
  if (!isOpen) return null;

  return (
    <Dialog
      header={
        <Flex align="center" gap={2}>
          <Box
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(220, 38, 38, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(220, 38, 38, 0.3)",
            }}
          >
            <TrashIcon style={{ color: "#dc2626" }} />
          </Box>
          <Text weight="semibold" size={2}>
            Confirmar Eliminación
          </Text>
        </Flex>
      }
      id="confirm-delete-dialog"
      onClose={onClose}
      open={isOpen}
      width={0}
    >
      <Box padding={4}>
        <Stack space={4}>
          <Text size={2}>
            ¿Estás seguro de que deseas eliminar{" "}
            <Text weight="bold" accent>
              &quot;{docTitle}&quot;
            </Text>
            ?
          </Text>
          <Card
            padding={3}
            radius={2}
            tone="critical"
            border
            style={{
              background: "rgba(220, 38, 38, 0.04)",
              borderColor: "rgba(220, 38, 38, 0.15)",
            }}
          >
            <Text muted size={1}>
              Esta acción no se puede deshacer. El documento será eliminado
              permanentemente del CMS y desaparecerá del sitio web.
            </Text>
          </Card>
          <Flex gap={3} justify="flex-end" marginTop={1}>
            <Button
              mode="ghost"
              onClick={onClose}
              text="Cancelar"
              disabled={loading}
              style={{ minWidth: "100px" }}
            />
            <Button
              mode="bleed"
              tone="critical"
              onClick={onConfirm}
              text={loading ? "Eliminando..." : "Sí, eliminar"}
              disabled={loading}
              icon={loading ? Spinner : TrashIcon}
              style={{ minWidth: "140px" }}
            />
          </Flex>
        </Stack>
      </Box>
    </Dialog>
  );
}

// ── Componente principal ──
export default function DeletableList({ schemaType, title, icon }: DeletableListProps) {
  const client = useClient({ apiVersion: "2024-01-01" });
  const router = useRouter();
  const [documents, setDocuments] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState<SanityDocument | null>(null);

  // Cargar documentos
  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const query = `*[_type == $type] | order(_createdAt desc) {
        _id,
        _type,
        name,
        title,
        slug,
        _createdAt,
        _updatedAt
      }`;
      const docs = await client.fetch(query, { type: schemaType });
      setDocuments(docs || []);
    } catch (err) {
      console.error("Error cargando documentos:", err);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, [client, schemaType]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Click en X → abrir diálogo
  const handleDeleteClick = useCallback(
    (e: React.MouseEvent, doc: SanityDocument) => {
      e.stopPropagation();
      e.preventDefault();
      setDocToDelete(doc);
      setDialogOpen(true);
    },
    [],
  );

  // Confirmar eliminación
  const handleConfirmDelete = useCallback(async () => {
    if (!docToDelete?._id) return;
    setDeleting(true);
    try {
      await client.delete(docToDelete._id);
      setDialogOpen(false);
      setDocToDelete(null);
      // Refrescar lista
      await fetchDocuments();
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("No se pudo eliminar el documento. Inténtalo de nuevo.");
    } finally {
      setDeleting(false);
    }
  }, [client, docToDelete, fetchDocuments]);

  // Cerrar diálogo
  const handleCloseDialog = useCallback(() => {
    if (deleting) return;
    setDialogOpen(false);
    setDocToDelete(null);
  }, [deleting]);

  // Navegar al documento al hacer clic en la fila
  const handleDocClick = useCallback(
    (doc: SanityDocument) => {
      router.navigateIntent("edit", { id: doc._id, type: doc._type });
    },
    [router],
  );

  const getDocTitle = (doc: SanityDocument) =>
    doc.name || doc.title || doc.slug?.current || "Sin título";

  if (loading) {
    return (
      <Box padding={5}>
        <Flex align="center" justify="center" gap={3} height="fill">
          <Spinner muted />
          <Text muted size={2}>Cargando {title.toLowerCase()}...</Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box padding={3}>
      {/* Header con conteo */}
      <Flex
        align="center"
        justify="space-between"
        padding={2}
        marginBottom={2}
      >
        <Flex align="center" gap={2}>
          {icon}
          <Text weight="semibold" size={2}>
            {title}
          </Text>
          <Card
            padding={1}
            radius={2}
            tone="primary"
            style={{ background: "rgba(59,130,246,0.08)", fontSize: "12px" }}
          >
            <Text muted size={0}>
              {documents.length} {documents.length === 1 ? "elemento" : "elementos"}
            </Text>
          </Card>
        </Flex>
        {documents.length > 0 && (
          <Text muted size={1}>
            Haz clic en la X roja para eliminar
          </Text>
        )}
      </Flex>

      {/* Lista de documentos */}
      {documents.length === 0 ? (
        <Card padding={5} radius={2} tone="transparent" border>
          <Flex
            align="center"
            justify="center"
            direction="column"
            gap={2}
            height="fill"
          >
            <Text muted size={3}>
              No hay {title.toLowerCase()} aún
            </Text>
            <Text muted size={1}>
              Usa el botón &quot;+&quot; arriba para crear uno nuevo
            </Text>
          </Flex>
        </Card>
      ) : (
        <Stack space={1}>
          {documents.map((doc, index) => {
            const docTitle = getDocTitle(doc);
            return (
              <Box
                key={doc._id}
                onClick={() => handleDocClick(doc)}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: "var(--card-bg, #fff)",
                  border: "1px solid var(--card-border-color, rgba(0,0,0,0.08))",
                  transition: "all 0.15s ease",
                  animation: `fadeIn 0.2s ease ${index * 0.03}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.3)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--card-border-color, rgba(0,0,0,0.08))";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Info del documento */}
                <Flex align="center" gap={3} style={{ flex: 1, minWidth: 0 }}>
                  <Text
                    muted
                    size={1}
                    style={{
                      background: "rgba(0,0,0,0.04)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      flexShrink: 0,
                    }}
                  >
                    {schemaType === "product" ? "Producto" : "Categoría"}
                  </Text>
                  <Text
                    size={2}
                    weight="medium"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {docTitle}
                  </Text>
                </Flex>

                {/* Botón X roja */}
                <button
                  onClick={(e) => handleDeleteClick(e, doc)}
                  title={`Eliminar "${docTitle}"`}
                  aria-label={`Eliminar ${docTitle}`}
                  style={{
                    flexShrink: 0,
                    marginLeft: "12px",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(220, 38, 38, 0.06)",
                    color: "#b91c1c",
                    fontSize: "16px",
                    fontWeight: "bold",
                    lineHeight: "1",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s ease",
                    padding: 0,
                    opacity: "0.5",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(220, 38, 38, 0.15)";
                    e.currentTarget.style.color = "#dc2626";
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "scale(1.15)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(220, 38, 38, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(220, 38, 38, 0.06)";
                    e.currentTarget.style.color = "#b91c1c";
                    e.currentTarget.style.opacity = "0.5";
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  ✕
                </button>
              </Box>
            );
          })}
        </Stack>
      )}

      {/* Estilo de animación */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Diálogo de confirmación */}
      {docToDelete && (
        <ConfirmDialog
          isOpen={dialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDelete}
          docTitle={getDocTitle(docToDelete)}
          loading={deleting}
        />
      )}
    </Box>
  );
}
