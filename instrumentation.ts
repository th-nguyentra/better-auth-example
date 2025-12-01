import { registerOTel } from "@vercel/otel";

export function register() {
  console.log("🚀 Server instrumentation running on Vercel");
  registerOTel("my-app");
}
