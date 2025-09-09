import { type DetectionBox, type ApiResp } from "@/hooks/types";
import { type FileWithPreview } from "@/hooks/use-file-upload";

export const computeBoxes = ({
  rawDetections,
  file,
}: {
  rawDetections: ApiResp["detections"];
  file: FileWithPreview;
}) => {
  console.log("Raw detections from API", { rawDetections });

  const imgW = file.width;
  const imgH = file.height;

  const detections: DetectionBox[] = (rawDetections || []).map((d, idx) => {
    const { box, label, score } = d;
    const absX = box.xmin;
    const absY = box.ymin;
    const absW = box.xmax - box.xmin;
    const absH = box.ymax - box.ymin;
    // Normalized (0..1) relative to full image dimensions
    const normX = imgW ? absX / imgW : 0;
    const normY = imgH ? absY / imgH : 0;
    const normW = imgW ? absW / imgW : 0;
    const normH = imgH ? absH / imgH : 0;
    return {
      id: String(idx),
      label,
      score,
      // Store normalized in box to keep overlay code simple; adjust if you prefer absolute.
      box: { x: normX, y: normY, width: normW, height: normH },
    };
  });

  return detections;
};
