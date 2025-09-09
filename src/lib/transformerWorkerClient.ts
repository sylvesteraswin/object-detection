import { ApiResp } from "@/hooks/types";

export class TransformerWorkerClient {
  private worker: Worker;

  constructor() {
    this.worker = new Worker(
      new URL("../app/workers/transformer.worker.ts", import.meta.url),
      {
        type: "module",
      }
    );
  }

  loadModel(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.worker.postMessage({ type: "load" });
      const listener = (event: MessageEvent) => {
        if (event.data.status === "loaded") {
          this.worker.removeEventListener("message", listener);
          resolve();
        } else if (event.data.status === "error") {
          this.worker.removeEventListener("message", listener);
          reject(event.data.error);
        }
      };
      this.worker.addEventListener("message", listener);
    });
  }

  runDetection(
    image: string | Blob | HTMLImageElement,
    threshold = 0.9
  ): Promise<ApiResp["detections"]> {
    return new Promise((resolve, reject) => {
      this.worker.postMessage({ type: "detect", data: image, threshold });
      const listener = (event: MessageEvent) => {
        if (event.data.status === "success") {
          this.worker.removeEventListener("message", listener);
          resolve(event.data.results);
        } else if (event.data.status === "error") {
          this.worker.removeEventListener("message", listener);
          reject(event.data.error);
        }
      };
      this.worker.addEventListener("message", listener);
    });
  }
}
