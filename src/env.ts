import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    HF_API_KEY: z.string().min(1, "Hugging Face API key is required"),
    HF_ACCOUNT_ID: z.string().min(1, "Hugging Face Account ID is required"),
    HF_GATEWAY_ID: z.string().min(1, "Hugging Face Gateway ID is required"),
    HF_MODEL_SERVER: z.string().min(1, "Hugging Face Server Model is required"),
  },
  client: {
    NEXT_PUBLIC_HF_MODEL: z.string().min(1, "Hugging Face Model is required"),
    NEXT_PUBLIC_OBJECT_THRESHOLD: z
      .string()
      .transform((val) => Number(val))
      .refine((num) => !Number.isNaN(num) && num >= 0 && num <= 1, {
        message: "Object threshold must be a number between 0 and 1",
      })
      .default(0.9),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    HF_API_KEY: process.env.HF_API_KEY,
    HF_ACCOUNT_ID: process.env.HF_ACCOUNT_ID,
    HF_GATEWAY_ID: process.env.HF_GATEWAY_ID,
    HF_MODEL_SERVER: process.env.HF_MODEL_SERVER,
    NEXT_PUBLIC_HF_MODEL: process.env.NEXT_PUBLIC_HF_MODEL,
    NEXT_PUBLIC_OBJECT_THRESHOLD: process.env.NEXT_PUBLIC_OBJECT_THRESHOLD,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});
