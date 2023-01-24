const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express.Router();

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    const { prompt } = req.body;
    console.log(prompt);
    const configuration = new Configuration({
      apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createImage({
      prompt,
      n: 3,
      size: "512x512",
      response_format: "b64_json",
    });

    console.log(response.data.data[0]["b64_json"]);
    res.send(response.data.data[0]["b64_json"]);
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
});
