import { Suspense, lazy } from "react";

const LazyDropzone = lazy(() =>
  import("@/components/Dropzone").then((module) => ({
    default: module.Dropzone,
  }))
);

const LazyImageObject = lazy(() =>
  import("@/components/InlineImageObject").then((module) => ({
    default: module.InlineImageObject,
  }))
);

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-foreground mb-2.5 text-3xl tracking-tight md:text-5xl">
        Object Detection Demo
      </h1>
      <p className="font-inter-tight text-mid-gray text-base">
        Upload an image to detect objects within it, powered by a model running
        locally in your browser.
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyDropzone />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyImageObject />
      </Suspense>
    </div>
  );
}
