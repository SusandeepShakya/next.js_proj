import {
    DatadogExporter,
    DatadogPropagator,
    DatadogSpanProcessor,
} from 'opentelemetry-exporter-datadog';
import { datadog } from 'opentelemetry-exporter-datadog/build/src/types';

const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const {
    ConsoleSpanExporter,
} = require('@opentelemetry/exporter-collector-grpc');

const provider = new NodeTracerProvider();

// Create a console exporter for debugging (replace with your preferred exporter)
const exporter = new DatadogExporter({});

// Add a span processor to the provider
provider.addSpanProcessor(new DatadogSpanProcessor(exporter));

// Register the provider globally
provider.register({
    propagator: new DatadogPropagator(),
});

// import { propagation } from '@opentelemetry/api';
// import {
//     NodeTracerProvider,
//     ConsoleSpanExporter,
//     SimpleSpanProcessor,
// } from '@opentelemetry/sdk-trace-node';
// const provider = new NodeTracerProvider();
// const consoleExporter = new ConsoleSpanExporter();
// const spanProcessor = new SimpleSpanProcessor(consoleExporter);
// provider.addSpanProcessor(spanProcessor);
// provider.register({
//     propagator: propagation,
// });

// console.log('asdasad');

// import { registerOTel } from '@vercel/otel';

// export function register() {
//     registerOTel('next-app');
// }
