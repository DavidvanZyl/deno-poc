import * as kafkasaur from "https://deno.land/x/kafkasaur@v0.0.7/index.ts";

import { addTodo } from './todo.ts';

const { 
        BOOTSTRAP_SERVERS,
        SECURITY_PROTOCOL,
        SASL_MECHANISM,
        SASL_USERNAME,
        SASL_PASSWORD,
        SESSION_TIMEOUT 
    } = Deno.env.toObject();

const kafka = new Kafkasaur({
        clientId: 'example-consumer',
        brokers: [BOOTSTRAP_SERVERS],
        sasl: {
            mechanism: SASL_MECHANISM,
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