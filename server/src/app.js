require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const { runConsumer } = require("./kafka/consumer");
const { runProducer } = require("./kafka/producer");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server configuration
app.listen(port, () => {
  runProducer({
    topicId: process.env.TOPIC_ID,
    messages: [{ value: "hello there" }],
  }).then(() => {
    runConsumer({ topicId: process.env.TOPIC_ID, groupId: "some-group-id" });
  });

  console.log(`listening on port ${port}`);
});
