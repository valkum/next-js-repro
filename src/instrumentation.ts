import { registerOTel } from "@vercel/otel";
export async function register() {
  // eslint-disable-next-line no-console
  console.log("instrumentation::register() called");
  // registerOTel("next");
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("./instrumentation.node");
  }
}
