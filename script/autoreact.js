module.exports = {
    config: {
        name: "autoreact",
		      version: "1.0",
	       	author: "Loid Butter",
		      countDown: 5,
	       	role: 0,
		      shortDescription: "",
	       	longDescription: "",
		       category: "dont know ",
    },
	onStart: async function (){},
	onChat: async function ({ event ,api}) {
		if (event.body.toLowerCase().indexOf("prefix") !== -1) return api.setMessageReaction("🌟", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("cool") !== -1) return api.setMessageReaction("😎", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("salut") !== -1) return api.setMessageReaction("👀", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("y") !== -1) return api.setMessageReaction("👋", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("bonjour") !== -1) return api.setMessageReaction("🤧", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("👀") !== -1) return api.setMessageReaction("😶", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("🌟") !== -1) return api.setMessageReaction("😂", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😆") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("😂") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
		
		if (event.body.toLowerCase().indexOf("🤣") !== -1) return api.setMessageReaction("😆", event.messageID,event.threadID)
    
   	if (event.body.toLowerCase().indexOf("😡") !== -1) return api.setMessageReaction("😒", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("😑") !== -1) return api.setMessageReaction("😬", event.messageID,event.threadID)

		if (event.body.toLowerCase().indexOf("😡") !== -1) return api.setMessageReaction("❤😑", event.messageID,event.threadID)

		if (event.body.toLowerCase().indexOf("junior") !== -1) return api.setMessageReaction("🌟", event.messageID,event.threadID)

    		if (event.body.toLowerCase().indexOf("ok") !== -1) return api.setMessageReaction("😶", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("junior") !== -1) return api.setMessageReaction("😳", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("naruto") !== -1) return api.setMessageReaction("😁", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("naruto") !== -1) return api.setMessageReaction("😎", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("kurama") !== -1) return api.setMessageReaction("🔥", event.messageID,event.threadID)

        		if (event.body.toLowerCase().indexOf("help") !== -1) return api.setMessageReaction("😮", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("help") !== -1) return api.setMessageReaction("😳", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("prefix ") !== -1) return api.setMessageReaction("😖", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("😏") !== -1) return api.setMessageReaction("😏", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("callad") !== -1) return api.setMessageReaction("😮", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("fuck you") !== -1) return api.setMessageReaction("🤬", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("ninja") !== -1) return api.setMessageReaction("👀", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("konoha") !== -1) return api.setMessageReaction("😎", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("😒") !== -1) return api.setMessageReaction("🖕", event.messageID,event.threadID)
  
    if (event.body.toLowerCase().indexOf("t") !== -1) return api.setMessageReaction("😖", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("a") !== -1) return api.setMessageReaction("😮", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("i") !== -1) return api.setMessageReaction("😏", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("o") !== -1) return api.setMessageReaction("😎", event.messageID,event.threadID)

    if (event.body.toLowerCase().indexOf("lo") !== -1) return api.setMessageReaction("💗", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("r") !== -1) return api.setMessageReaction("😂", event.messageID,event.threadID)

if (event.body.toLowerCase().indexOf("bot") !== -1) return api.setMessageReaction("🤩", event.messageID,event.threadID)
    
  }
};
