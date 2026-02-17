import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const PORT = 3000;

// Ganti dengan API key OpenAI-mu
const openai = new OpenAI({
  apiKey: "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"
});

app.use(cors());
app.use(express.json());

// Endpoint AI
app.post("/api/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt || "Halo!";
    const systemPrompt = `
Hallo, kamu adalah AI GPT-4.1 Mini yang ramah. Jawab dengan jelas dan singkat.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 1,
      top_p: 1
    });

    const text = response.choices[0].message.content;
    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: "(AI gagal menjawab)" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});