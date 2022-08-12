import { Application } from "https://deno.land/x/oak/mod.ts";

import startConsumer from './controllers/consumer.ts';
import startProducer from './controllers/producer.ts';

const PORT = 3000;
const app = new Application();

await startConsumer();
await startProducer();
console.log('DONE');