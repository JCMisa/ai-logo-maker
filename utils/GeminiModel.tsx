import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.85,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

export const chatSession = model.startChat({
  generationConfig,
  safetySettings,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate 6 logo ideas based on the following user input:\n        - Design: Cartoon Logo\n        - Title: Cat\n        - Description: Cat logo for coffee business\n        - based on the design, Create a set of vibrant, playful logo designs featuring whimsical characters, bright colors, and fun typography.\n      The response should be an array of six strings, with each string describing a unique logo design. For example: \n      ["logo idea 1", "logo idea 2", "logo idea 3", "logo idea 4", "logo idea 5", "logo idea 6"].',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```json\n[\n\"A cartoon cat wearing a barista apron, holding a steaming coffee cup, with playful, bubbly font for 'Cat' Coffee.\",\n\"A chubby, smiling cat curled up inside a giant coffee bean, surrounded by coffee beans in warm brown and bright orange colors, with a handwritten-style font for 'Cat'.\",\n\"A cat with oversized sunglasses and a cool hat, sipping coffee through a straw,  featuring a retro-style font for 'Cat Coffee' in bold colors.\",\n\"Three cartoon cats – one black, one orange, one calico – each holding a coffee cup, arranged in a circle around a coffee bean in the center, with a simple, playful sans-serif font for 'Cat'.\",\n\"A cat perched on top of a coffee machine, steam forming a heart shape above it, using a vibrant color palette with a bold, italic font for 'Cat Coffee'.\",\n\"A cat dressed as a superhero with a coffee bean as its emblem, in bright, comic-book style colors, with a dynamic, bold font for 'Cat Coffee' that suggests energy and power.\"\n]\n```\n",
        },
      ],
    },
  ],
});
