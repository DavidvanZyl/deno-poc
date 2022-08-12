import {Kafkasaur} from "https://deno.land/x/kafkasaur/index.ts"
import { config } from "https://deno.land/x/dotenv/mod.ts";

import { addTodo } from './todo.ts';

const { 
        BOOTSTRAP_SERVERS,
        SECURITY_PROTOCOL,
        SASL_MECHAINSM,
        SASL_USERNAME,
        SASL_PASSWORD,
        SESSION_TIMEOUT 
    } = config();

const kafka = new Kafkasaur({
        clientId: 'example-consumer',
        brokers: [BOOTSTRAP_SERVERS],
        sasl: {
            mechanism: SASL_MECHAINSM,
            username: SASL_USERNAME,
            password: SASL_PASSWORD
        },
    }
);

const topic = 'david.deno.test';

const consumer = kafka.consumer({ groupId: 'test-group' })

const startConsumer = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  
  await consumer.run({
    eachMessage: async (message: any) => {
      addTodo(message);
      console.log(message);
    },
  })
}

export default startConsumer;