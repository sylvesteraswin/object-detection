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
    <section className="overflow-hidden px-2.5 lg:px-0">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 overflow-hidden border-r border-b border-l px-6 py-12 md:px-16 md:py-20">
        <div className="space-y-2">
          <h1 className="text-foreground mb-2.5 text-3xl tracking-tight md:text-5xl">
            Object Detection Demo
          </h1>
          <p className="font-tight text-base">
            Upload an image to detect objects within it, powered by a model
            running locally in your browser.
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyDropzone />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyImageObject />
        </Suspense>
      </div>
    </section>
  );
}
