const { configKafka } = require("../utils/utils");

const runConsumer = async function ({ topicId, groupId }) {
  const consumer = configKafka().consumer({ groupId });
  await consumer.connect();
  console.log("consumer connected");
  await consumer.subscribe({ topic: topicId });
  consumer.run({
    eachMessage: ({ topic, partition, message }) => {
      console.log({ topic, partition, message: message.value.toString() });
    },
  });
};

module.exports = { runConsumer };
