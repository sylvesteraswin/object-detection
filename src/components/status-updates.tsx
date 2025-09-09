import { FunctionComponent } from "react";
import { Loader2 } from "lucide-react";

import { type DetectState } from "@/hooks/types";

// Deterministic pastel-ish color based on label + index
function colorFor(label: string, index: number) {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = (hash * 31 + label.charCodeAt(i)) >>> 0;
  }
  // Spread indices a bit so identical labels still differ if multiple instances
  const hue = (hash + index * 23) % 360;
  const saturation = 85; // %
  const lightness = 55; // %
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

export const StatusUpdates: FunctionComponent<{
  state: DetectState;
  showDetections?: boolean;
}> = ({ state, showDetections = true }) => {
  return (
    <>
      {state.status === "loading" && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center flex-col gap-2">
          <Loader2 className="size-8 text-white animate-spin" />
          <div className="text-white text-sm">Detecting objects...</div>
        </div>
      )}
      {state.status === "success" &&
        state.detections.length > 0 &&
        showDetections && (
          <div className="absolute inset-0 pointer-events-none">
            {state.detections.map((d, i) => {
              const { x, y, width, height } = d.box; // already normalized 0-1
              const left = x * 100;
              const top = y * 100;
              const w = width * 100;
              const h = height * 100;
              const color = colorFor(d.label, i);
              return (
                <div
                  key={d.id}
                  className="absolute border-2 animate-in fade-in"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${w}%`,
                    height: `${h}%`,
                    borderColor: color,
                  }}
                >
                  <div
                    className="absolute -top-[35px] -left-[2px] -right-[2px] text-white text-[10px] font-medium px-1 py-0.5 min-h-[35px] flex items-center overflow-hidden"
                    style={{ backgroundColor: color }}
                  >
                    {d.label} {(d.score * 100).toFixed(1)}%
                  </div>
                </div>
              );
            })}
          </div>
        )}
      {state.status === "success" && state.detections.length === 0 && (
        <div className="absolute inset-0 bg-black/30 text-white p-4 flex items-center justify-center text-center">
          <div>
            <p className="font-medium">No objects detected</p>
            <p className="text-xs mt-1">
              Try another image or adjust the detection threshold.
            </p>
          </div>
        </div>
      )}
      {state.status === "error" && (
        <div className="absolute inset-0 bg-red-500/80 text-white p-4 flex items-center justify-center text-center">
          <div>
            <p className="font-medium">Error during detection</p>
            <p className="text-xs mt-1">{state.error}</p>
          </div>
        </div>
      )}
    </>
  );
};
