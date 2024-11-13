const axios = require('axios');

module.exports = {
  config: {
    name: "gemini",
    aliases: ['Gemini', 'google','Google','gemini'],
    version: 2.0,
    author: "OtinXSandip",
    description: "ai",
    role: 0,
    category: "AI",
    guide: {
      en: "{p}{n} <Query>",
    },
  },
  onStart: async function ({ message, usersData, event, api, args }) {
    try {
      if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments[0].type === "photo") {
        const photoUrl = encodeURIComponent(event.messageReply.attachments[0].url);
        const lado = args.join(" ");
        const url = `https://sandipbaruwal.onrender.com/gemini2?prompt=${encodeURIComponent(lado)}&url=${photoUrl}`;
        const response = await axios.get(url);

        message.reply(response.data.answer);
        return;
      }

      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;

      const ment = [{ id: id, tag: name }];
      const prompt = args.join(" on ");
      const encodedPrompt = encodeURIComponent(prompt);
      api.setMessageReaction("⏳", event.messageID, () => { }, true);
      const res = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`);
      const result = res.data.answer;

      api.setMessageReaction("✅", event.messageID, () => { }, true);
      message.reply({
        body: `\n ❀𖦹𝙂𝙀𝙈𝙄𝙉𝙄 𝙤𝙪  𝙂𝙊𝙊𝙂𝙇𝙀𖦹❀ \n━━━━━━━━━━━━━━━\n𝘽𝙤𝙣𝙟𝙤𝙪𝙧 ${name}, 𝘫'𝘦𝘴𝘱𝘦̀𝘳𝘦 𝘲𝘶𝘦 𝘵𝘶 𝘷𝘢𝘴 𝘣𝘪𝘦𝘯. Pour répondre à ta question. ${result}\n━━━━━━━━━━━━━━━\n${name}, 𝙫𝙚𝙪𝙞𝙡𝙡𝙚𝙯 𝙧𝙚𝙥𝙤𝙣𝙙𝙧𝙚 𝙖𝙪 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙨𝙪𝙞𝙫𝙖𝙣𝙩 𝙥𝙤𝙪𝙧 𝙘𝙤𝙣𝙩𝙞𝙣𝙪𝙚𝙧 𝙣𝙤𝙩𝙧𝙚 𝙙𝙞𝙨𝙘𝙪𝙨𝙨𝙞𝙤𝙣`,
        mentions: ment,
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onReply: async function ({ message, event, Reply, args, api, usersData }) {
    try {
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;

      const ment = [{ id: id, tag: name }];
      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
      api.setMessageReaction("⏳", event.messageID, () => { }, true);
      const res = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`);
      const result = res.data.answer;

      api.setMessageReaction("✅", event.messageID, () => { }, true);
      message.reply({
        body: `❁..𝙂𝙀𝙈𝙄𝙉𝙄 𝙤𝙪  𝙂𝙊𝙊𝙂𝙇𝙀..❁ \n━━━━━━━━━━━━━━━\n ${result}\n━━━━━━━━━━━━━━━\n${name}, 𝙫𝙚𝙪𝙞𝙡𝙡𝙚𝙯 𝙧𝙚𝙥𝙤𝙣𝙙𝙧𝙚 𝙖𝙪 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙨𝙪𝙞𝙫𝙖𝙣𝙩 𝙥𝙤𝙪𝙧 𝙘𝙤𝙣𝙩𝙞𝙣𝙪𝙚𝙧 𝙣𝙤𝙩𝙧𝙚 𝙙𝙞𝙨𝙘𝙪𝙨𝙨𝙞𝙤𝙣`,
        mentions: ment,
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
