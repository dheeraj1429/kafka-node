const { Kafka } = require("kafkajs");

const configureKafka = function () {
  const kafka = new Kafka({
    clientId: "18821ece-ee61-4934-801d-4199db7a3267",
    brokers: ["127.0.0.1:9092"],
  });

  return kafka;
};

module.exports = {
  configureKafka,
};
