const axios = require('axios');

async function fetchFromAI(url, params) {
 try {
 const response = await axios.get(url, { params });
 return response.data;
 } catch (error) {
 console.error(error);
 return null;
 }
}

async function getAIResponse(input, userName, userId, messageID) {
 const services = [
 { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
 ];

 let response = `Pose t'as question, je vais t'aider `;
 let currentIndex = 0;

 for (let i = 0; i < services.length; i++) {
 const service = services[currentIndex];
 const data = await fetchFromAI(service.url, service.params);
 if (data && (data.gpt4 || data.reply || data.response)) {
 response = data.gpt4 || data.reply || data.response;
 break;
 }
 currentIndex = (currentIndex + 1) % services.length; // Passer au service suivant
 }

 return { response, messageID };
}

module.exports = {
 config: {
 name: '2ai',
 author: 'shizuka',
 role: 0,
 aliase: ["2ai"],
 category: 'ai-chat',
 shortDescription: 'ai to ask anything',
 },
 onStart: async function ({ api, event, args }) {
 const input = args.join(' ').trim();
 if (!input) {
 api.sendMessage(" ", event.threadID, event.messageID);
 return;
 }

 api.getUserInfo(event.senderID, async (err, ret) => {
 if (err) {
 console.error(err);
 return;
 }
 const userName = ret[event.senderID].name;
 const { response, messageID } = await getAIResponse(input, userName, event.senderID, event.messageID);
 api.sendMessage(`᯽..𝙉𝘼𝙍𝙐𝙏𝙊 𝙐𝙕𝙐𝙈𝘼𝙆𝙄.2.0.᯽\n━━━━━━━━━━━━━━━━\n⧉${response} ⧉\n━━━━━━━━━━━━━━━━`, event.threadID, messageID);
 });
 },
 onChat: async function ({ api, event, message }) {
 const messageContent = event.body.trim().toLowerCase();
 if (messageContent.startsWith("2ai")) {
 const input = messageContent.replace(/^2ai\s*/, "").trim();
 api.getUserInfo(event.senderID, async (err, ret) => { 
 if (err) {
 console.error(err);
 return;
 }
 const userName = ret[event.senderID].name;
 const { response, messageID } = await getAIResponse(input, userName, event.senderID, message.messageID);
 message.reply(`᯽..𝙉𝘼𝙍𝙐𝙏𝙊 𝙐𝙕𝙐𝙈𝘼𝙆𝙄.2.0.᯽\n━━━━━━━━━━━━━━━━\n⧉${userName} , ${response} ⧉\n━━━━━━━━━━━━━━━━\n `, messageID);
api.setMessageReaction("✅", event.messageID, () => {}, true);

 });
 }
 }
};
