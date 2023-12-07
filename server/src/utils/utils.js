const { Kafka, logLevel } = require("kafkajs");

const configKafka = function () {
  const brokers = ["127.0.0.1:9092"];

  const kafka = new Kafka({
    clientId: "b29398f9-9472-423a-af30-26564de8e0df",
    brokers,
    connectionTimeout: 3000,
    requestTimeout: 25000,
    retry: {
      initialRetryTime: 100,
      retries: 8,
    },
    logLevel: logLevel.INFO,
  });

  return kafka;
};

module.exports = { configKafka };
