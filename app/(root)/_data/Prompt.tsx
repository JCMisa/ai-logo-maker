export const prompt = {
  DESIGN_IDEA_PROMPT:
    "Based on the type of logo: {logoType}, generate a text prompt to create a logo for the brand name {logoTitle}, with the description: {logoDesc}, and referring to the prompt: {logoPrompt}. Provide 4-5 logo ideas, each consisting of 4-5 words. Return the result in JSON format with an ideas field.",

  LOGO_PROMPT:
    "Generate a text prompt to create a logo for the brand name: {logoTitle}. The logo should have a description: {logoDesc}, and use the color combination of {logoColor}. Additionally, incorporate the following idea: {logoIdea}, and design concept: {logoDesign}. Refer to this logo prompt: {logoPrompt}. Provide the result in a JSON format with the prompt field only.",
};
