// Use lazy loading to avoid loading the OpenTelemetry SDK in the edge context.
import { DiagConsoleLogger, DiagLogLevel, diag } from "@opentelemetry/api";
import {
  CompositePropagator,
  W3CTraceContextPropagator,
} from "@opentelemetry/core";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import {
  detectResourcesSync,
  envDetector,
  Resource,
} from "@opentelemetry/resources";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { randomBytes } from "crypto";

export function register() {
  registerInstrumentations({
    instrumentations: [new HttpInstrumentation()],
  });

  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
  const resource = Resource.default()
    .merge(
      new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "next",
      })
    )
    .merge(detectResourcesSync({ detectors: [envDetector] }));
  const provider = new NodeTracerProvider({ resource });

  const exporter = new OTLPTraceExporter({
    url: "http://localhost:4317/v1/traces",
  });
  console.log(`OTLP tracing enabled`);
  let processor = new BatchSpanProcessor(exporter);

  const propagator = new CompositePropagator({
    propagators: [new W3CTraceContextPropagator()],
  });

  provider.addSpanProcessor(processor);

  provider.register({ propagator });

  process.on("SIGTERM", () => {
    provider.shutdown();
  });
}

register();
