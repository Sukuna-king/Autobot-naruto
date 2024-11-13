module.exports = {

  config: {

    name: "respect",

    aliases: [],

    version: "1.0",

    author: "AceGun x Samir Œ",

    countDown: 0,

    role: 0,

    shortDescription: "Give admin and show respect",

    longDescription: "Gives admin privileges in the thread and shows a respectful message.",

    category: "owner",

    guide: "{pn} respect",

  },



  onStart: async function ({ message, args, api, event }) {

    try {

      console.log('Sender ID:', event.senderID);



      const permission = ["61556172651835"];

      if (!permission.includes(event.senderID)) {

        return api.sendMessage(

          "𝐓𝐨𝐢 𝐭𝐮 𝐧𝐞 𝐦𝐞́𝐫𝐢𝐭𝐞𝐬 𝐚𝐮𝐜𝐮𝐧 𝐫𝐞𝐬𝐩𝐞𝐜𝐭 𝐯𝐞𝐧𝐚𝐧𝐭 𝐝𝐞 𝐦𝐨𝐢, 𝐣𝐞 𝐭'𝐞𝐧𝐜𝐮𝐥𝐞 𝐝𝐞𝐮𝐱 𝐟𝐨𝐢𝐱...(🖕◉⁠Д⁠◉⁠)🖕",

          event.threadID,

          event.messageID

        );

      }



      const threadID = event.threadID;

      const adminID = event.senderID;

      

      // Change the user to an admin

      await api.changeAdminStatus(threadID, adminID, true);



      api.sendMessage(

        `Boss vous pouvez instaurer votre dictature suprême car vous êtes désormais administrateur de ce groupe.....😗`,

        threadID

      );

    } catch (error) {

      console.error("Error promoting user to admin:", error);

      api.sendMessage("Désolé Boss mais je ne peux pas vous nommez administrateur de ce groupe......😞", event.threadID);

    }

  },

};
