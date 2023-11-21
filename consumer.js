const { configureKafka } = require("./utils");

async function consume() {
  // configure Kafka
  const kafka = configureKafka();

  // consume Kafka
  const consumer = kafka.consumer({ groupId: "player-jersey" });
  // connect the consumer
  await consumer.connect();
  console.log("Consumer connected");

  // subscribe to events
  await consumer.subscribe({
    topic: "cc15b609-807b-4a7f-a072-4d82d4d077ce",
    fromBeginning: true,
  });

  // listen the messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `To Partition ${partition} -> message ${message.value.toString()}`
      );
    },
  });
}

consume();
