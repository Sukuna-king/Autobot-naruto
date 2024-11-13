const axios = require('axios');

const Prefixes = [
  'google', 
  'google',
  'assistant',
  'Google',
  '🌐',
];

module.exports = {
  config: {
    name: "Google",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "Google",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("Comment puis-je vous assister aujourd'hui ?🌐");
        return;
      }


      const response = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
