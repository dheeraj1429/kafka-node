require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 9500;
const app = express();
const { runConsumer } = require("./kafka/consumer");
const { runProducer, runProducerTransaction } = require("./kafka/producer");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server configuration
app.listen(port, () => {
  runProducerTransaction({
    topicId: "6c665951-b019-416b-9219-b5200d30249a",
    messages: [{ value: "hello there", key: "some-key" }],
  }).then(() => {
    runConsumer({
      topicId: "6c665951-b019-416b-9219-b5200d30249a",
      groupId: "some-group-id",
    });
  });

  console.log(`listening on port ${port}`);
});
