const { configureKafka } = require("./utils");

async function produce() {
  // configure Kafka
  const kafka = configureKafka();

  // create producer
  const producer = kafka.producer();
  // connect producer
  await producer.connect();
  console.log("Producer connected");

  // send messages
  const producedData = await producer.send({
    topic: "cc15b609-807b-4a7f-a072-4d82d4d077ce",
    messages: [
      {
        value: JSON.stringify({ name: "some test data" }),
        partition: 1,
      },
    ],
  });
  console.log(`Produced data ${JSON.stringify(producedData)}`);
}

produce();
