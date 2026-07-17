"use client";

import { ForwardRefRenderFunction, forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputRender: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, className = "", ...props },
  ref
) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="font-sans text-[10px] uppercase tracking-wider text-secondary font-medium">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-4 py-3
          bg-surface
          border border-border
          text-primary font-sans text-sm
          placeholder-secondary/40
          focus:outline-none focus:border-accent
          rounded-none
          transition-colors duration-150
          ${error ? "border-red-600" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-[11px] text-red-600 font-sans">{error}</span>}
    </div>
  );
};

export const Input = forwardRef(InputRender);

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextareaRender: ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> = (
  { label, error, className = "", ...props },
  ref
) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="font-sans text-[10px] uppercase tracking-wider text-secondary font-medium">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`
          w-full px-4 py-3
          bg-surface
          border border-border
          text-primary font-sans text-sm
          placeholder-secondary/40
          focus:outline-none focus:border-accent
          rounded-none
          transition-colors duration-150
          min-h-[100px] resize-none
          ${error ? "border-red-600" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-[11px] text-red-600 font-sans">{error}</span>}
    </div>
  );
};

export const Textarea = forwardRef(TextareaRender);
