const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: "AIzaSyA9plBQolv24OCYfLD2qWm5OhHRzJYUPfs",
});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: contents,
    config: {
      systemInstruction: `
    You generate short caption in tapori language for the image provided.
    Your caption should be concise, descriptive, and engaging. It should capture the essence of the image and evoke emotions or curiosity in the viewer.
    You use hashtags and emojis in the caption.`,
    },
  });
  return response.text;
}

module.exports = generateCaption;
