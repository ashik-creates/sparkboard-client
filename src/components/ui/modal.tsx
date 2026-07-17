"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/20">
      <div 
        className="w-full max-w-xl bg-surface border border-border p-8 flex flex-col gap-6 rounded-none shadow-none"
        role="dialog"
      >
        <div className="flex justify-between items-center border-b border-border pb-4">
          <h3 className="font-heading text-lg tracking-tight text-primary font-medium">{title}</h3>
          <button 
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors text-2xl leading-none font-sans"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}
