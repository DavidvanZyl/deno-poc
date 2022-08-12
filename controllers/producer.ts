import * as Kafkasaur from "https://deno.land/x/kafkasaur@v0.0.7/index.ts";

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

const topic = 'topic-test';

const producer = kafka.producer();

const testmessage = {
  key: 'key',
  value: 'hello there',
  headers: {'correlation-id': `${Date.now()}`}
}

const messages: object[] = [];
messages.push(testmessage)

const sendMessage = () => {
  producer.send({
    topic,
    message: {
        "title": "Todo 1",
        "complete": false,
        "todoId": 1
      }
  })
}

const startProducer = async() => {
  await producer.connect();
  sendMessage();
}

export default startProducer;