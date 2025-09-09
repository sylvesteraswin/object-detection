import { pipeline } from "@huggingface/transformers";

// eslint-disable-next-line
// @ts-expect-error
let detector: Awaited<ReturnType<typeof pipeline>> | null = null;

self.onmessage = async (event: MessageEvent) => {
  const { type, data } = event.data;

  if (type === "load") {
    postMessage({ status: "loading" });
    try {
      detector = await pipeline("object-detection", "Xenova/yolos-small");
      postMessage({ status: "loaded" });
    } catch (error) {
      postMessage({ status: "error", error: (error as Error).message });
    }
  }

  if (type === "detect") {
    if (!detector) {
      postMessage({ status: "error", error: "Model not loaded" });
      return;
    }

    postMessage({ status: "detecting" });
    try {
      const imgData: ImageData = data;
      const results = await detector(imgData, {
        threshold: 0.9,
      });
      postMessage({ status: "success", results });
    } catch (error) {
      postMessage({ status: "error", error: (error as Error).message });
    }
  }
};

// eslint-disable-next-line
export default null;
