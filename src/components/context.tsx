"use client";

import { createContext, useContext } from "react";
import {
  type FileUploadState,
  type FileUploadActions,
  useFileUpload,
} from "@/hooks/use-file-upload";

interface ContextType {
  state: FileUploadState;
  options: FileUploadActions;
}

const Context = createContext<ContextType | undefined>(undefined);

export const maxSizeMB = 5;
export const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

export function Provider({ children }: { children: React.ReactNode }) {
  const [state, options] = useFileUpload({
    accept: "image/*",
    maxSize,
  });

  return (
    <Context.Provider value={{ state, options }}>{children}</Context.Provider>
  );
}

export function useFileUploadContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(
      "useFileUploadContext must be used within a FileUploadProvider"
    );
  }
  return context;
}
