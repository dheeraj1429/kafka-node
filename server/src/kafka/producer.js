const { configKafka } = require("../utils/utils");

const runProducer = async function ({ topicId, messages }) {
  const producer = configKafka().producer();
  await producer.connect();
  const processData = await producer.send({ topic: topicId, messages });
  console.log(JSON.stringify(processData));
};

module.exports = { runProducer };
