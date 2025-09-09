"use client";

import { AlertCircleIcon, ImageUpIcon } from "lucide-react";

import { useFileUploadContext, maxSizeMB } from "@/components/context";

export const Dropzone = () => {
  const {
    state: { isDragging, errors, files },
    options: {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  } = useFileUploadContext();

  if (files.length > 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="relative">
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
          />
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <ImageUpIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">
              Drop your image here or click to browse
            </p>
            <p className="text-muted-foreground text-xs">
              Max size: {maxSizeMB}MB
            </p>
          </div>
        </div>

        {errors.length > 0 && (
          <div
            className="text-destructive flex items-center gap-1 text-xs"
            role="alert"
          >
            <AlertCircleIcon className="size-3 shrink-0" />
            <span>{errors[0]}</span>
          </div>
        )}

        <p
          aria-live="polite"
          role="region"
          className="text-muted-foreground mt-2 text-center text-xs"
        >
          The image will be processed locally in your browser and will not be
          uploaded to any server.
        </p>
      </div>
    </div>
  );
};
