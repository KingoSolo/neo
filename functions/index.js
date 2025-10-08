const functions = require("firebase-functions");
const OpenAI = require("openai").default;


const openai = new OpenAI({
  apiKey: functions.config().openai.key, 
});


exports.generateResponse = functions.https.onRequest(async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong.");
  }
});
