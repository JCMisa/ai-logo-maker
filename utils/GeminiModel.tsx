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
          text: "Based on the type of logo: Cartoon Logo, generate a text prompt to create a logo for the brand name Cat, with the description: Cat logo for a coffee business, and referring to the prompt: Create a set of vibrant, playful logo designs featuring whimsical characters, bright colors, and fun typography. Provide 4-5 logo ideas, each consisting of 4-5 words. Return the result in JSON format with an ideas field.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "prompt": "Create a set of vibrant, playful cartoon logos for a coffee business called \'Cat\'.  The logos should feature whimsical cat characters, bright colors, and fun typography.  Provide 4-5 logo ideas, each described in 4-5 words.",\n  "ideas": [\n    "Happy Cat sipping coffee bean",\n    "Chill cat in coffee cup",\n    "Coffee-loving cat with sunbeams",\n    "Playful cat with coffee spill",\n    "Grumpy cat enjoying espresso"\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const aiLogoPrompt = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "generate ai logo prompt:  Generate a text prompt to create a logo for the brand name: cat. The logo should have a description: cat logo for coffee business, and use the color combination of Summer Vibes. Additionally, incorporate the following idea: Cat inside coffee cup, and design concept: Cartoon Logo. Refer to this logo prompt: Create a set of vibrant, playful logo designs featuring whimsical characters, bright colors, and fun typography. Provide the result in a JSON format with the prompt field only.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "```json\n{\n  \"prompt\": \"Create a cartoon logo for a coffee business called 'CAT'. The logo should feature a cat inside a coffee cup.  Use a 'Summer Vibes' color palette.  The design should be vibrant, playful, and whimsical. Think bright colors and fun typography.\"\n}\n```\n",
        },
      ],
    },
  ],
});
