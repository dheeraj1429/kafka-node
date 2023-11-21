const { configureKafka } = require("./utils");

async function createPartition() {
  // configure the kafka
  const kafka = configureKafka();

  // create kafka admin
  const admin = kafka.admin();
  await admin.connect();

  // create kafka partitions
  await admin.createTopics({
    topics: [
      {
        topic: "cc15b609-807b-4a7f-a072-4d82d4d077ce",
        numPartitions: 2,
      },
    ],
  });
  console.log("2 Partitions created");
  // disconnect the kafka admin
  await admin.disconnect();
}

createPartition();
