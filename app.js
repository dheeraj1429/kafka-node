const { configureKafka } = require("./utils");

const EXAMPLE_TOPIC = "example-topic";
const EXAMPLE_CONSUMER = "example-consumer";

const kafka = configureKafka();
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: EXAMPLE_CONSUMER });

async function main() {
  const admin = kafka.admin();
  await admin.connect();

  await admin.createTopics({
    topics: [
      {
        topic: EXAMPLE_TOPIC,
        numPartitions: 1,
      },
    ],
  });

  await producer.connect();
  await consumer.connect();

  await consumer.subscribe({ topic: EXAMPLE_TOPIC });
  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log({
        offset: message.offset,
        value: message.value?.toString(),
        key: message.key?.toString(),
      });
    },
  });

  process.on("SIGTERM", async () => {
    await admin.disconnect();
    await consumer.disconnect();
    await producer.disconnect();
    process.exit(0);
  });

  while (true) {
    await new Promise(async (res) => {
      await producer.send({
        topic: EXAMPLE_TOPIC,
        messages: [{ key: "some demo key", value: "hi hi hi" }],
      });

      setTimeout(() => res(null), 3 * Math.random() * 1000);
    });
  }
}

main();
