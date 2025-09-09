import { useRef, useEffect, useState } from "react";

import { useFileUploadContext } from "@/components/context";
import { TransformerWorkerClient } from "@/lib/transformerWorkerClient";
import { type DetectState } from "@/hooks/types";
import { computeBoxes } from "@/lib/compute-boxes";

export const useInlineObjectDetect = () => {
  const [workerClient, setWorkerClient] =
    useState<TransformerWorkerClient | null>(null);
  const [loadingWorker, setLoadingWorker] = useState(false);
  const [state, setState] = useState<DetectState>({ status: "idle" });

  const {
    state: { files },
  } = useFileUploadContext();

  const abortRef = useRef<AbortController | null>(null);
  const startedForIdRef = useRef<string | null>(null);

  const [file] = files;

  useEffect(() => {
    const workerClient = new TransformerWorkerClient();

    setWorkerClient(workerClient);
    setLoadingWorker(true);

    workerClient
      .loadModel()
      .then(() => {
        console.log("Model loaded in worker");
        setLoadingWorker(false);
      })
      .catch((err) => {
        console.error("Error loading model in worker", err);
        setLoadingWorker(false);
      });

    return () => {
      // Cleanup if needed when component unmounts
    };
  }, []);

  useEffect(() => {
    // Only start detection when we have dimensions so normalization works.
    if (!file?.file || !file?.preview) return;
    if (!file?.width || !file?.height) return; // wait until hook populates
    if (startedForIdRef.current === file.id) return; // already started for this file

    startedForIdRef.current = file.id;
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ status: "loading" });

    (async () => {
      try {
        let uploadFile: File;
        if (file.file instanceof File) {
          uploadFile = file.file;
        } else if (file.preview) {
          const blob = await fetch(file.preview).then((r) => r.blob());
          uploadFile = new File([blob], file.file.name || "upload.jpg", {
            type: blob.type || file.file.type || "image/jpeg",
          });
        } else {
          throw new Error("Unsupported file object");
        }

        // Convert to base64 data URI matching server format: data:<mime>;base64,<BASE64>
        const arrayBuf = await uploadFile.arrayBuffer();
        const b64 = Buffer.from(arrayBuf).toString("base64");
        const contentType = uploadFile.type || "application/octet-stream";
        const dataUri = `data:${contentType};base64,${b64}`;

        console.log("Starting detection (inline worker)", {
          name: uploadFile.name,
          type: uploadFile.type,
          size: uploadFile.size,
          width: file.width,
          height: file.height,
        });

        if (!workerClient) {
          throw new Error("Worker not initialized");
        }

        const rawDetections = await workerClient.runDetection(dataUri);
        console.log("Raw detections from API", { rawDetections });

        const detections = computeBoxes({ rawDetections, file });
        setState({ status: "success", detections });
      } catch (e) {
        if ((e as Error)?.name === "AbortError") return;
        setState({ status: "error", error: (e as Error).message });
      }
    })();
  }, [file, workerClient]);

  return { state, loadingWorker };
};
