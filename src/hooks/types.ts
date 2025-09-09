import type { ObjectDetectionOutputElement } from "@huggingface/tasks";

export interface DetectionBox {
  id: string;
  label: string;
  score: number;
  box: { x: number; y: number; width: number; height: number };
}

export type DetectState =
  | { status: "idle" }
  | { status: "loading" }
  | {
      status: "success";
      detections: DetectionBox[];
    }
  | { status: "error"; error: string };

export type ApiResp = { detections?: ObjectDetectionOutputElement[] };
