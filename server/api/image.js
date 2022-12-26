const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express.Router();

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const configuration = new Configuration({
      organization: "org-U7HIUnnp6RlfL3N7dHAp3qPX",
      apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    console.log(response.data.data[0]["b64_json"]);

    res.send(response.data.data[0]["b64_json"]);
  } catch (ex) {
    next(ex);
  }
});
