const { Kafka } = require("kafkajs");

const configKafka = function () {
  const brokers = ["127.0.0.1:9092"];

  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers,
  });

  return kafka;
};

module.exports = { configKafka };
