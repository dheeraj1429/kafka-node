const { configKafka } = require("../utils/utils");

const runProducer = async function ({ topicId, messages }) {
  const producer = configKafka().producer();
  await producer.connect();
  const processData = await producer.send({
    topic: topicId,
    messages,
  });
  console.log(JSON.stringify(processData));
};

const runProducerTransaction = async function ({ topicId, messages }) {
  const producer = configKafka().producer({
    idempotent: true,
    maxInFlightRequests: 1,
    transactionalId: "some-transactional-id",
  });

  await producer.connect();
  const transaction = await producer.transaction();

  try {
    await transaction.send({
      topic: topicId,
      messages,
    });
    // throw new Error("Some error occurred while sending");
    await transaction.commit();
    await producer.disconnect();
  } catch (err) {
    console.log(err, "some-error");
    await transaction.abort();
    await producer.disconnect();
  }
};

module.exports = { runProducer, runProducerTransaction };
