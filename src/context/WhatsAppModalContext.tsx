"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface WhatsAppModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const WhatsAppModalContext = createContext<WhatsAppModalContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  toggleModal: () => {},
});

export function WhatsAppModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen((p) => !p), []);

  return (
    <WhatsAppModalContext.Provider value={{ isOpen, openModal, closeModal, toggleModal }}>
      {children}
    </WhatsAppModalContext.Provider>
  );
}

export function useWhatsAppModal() {
  return useContext(WhatsAppModalContext);
}
