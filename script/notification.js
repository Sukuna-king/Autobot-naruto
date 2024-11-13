const { getStreamsFromAttachment } = global.utils;

module.exports = {
	config: {
		name: "notification",
		aliases: ["notify", "noti"],
		version: "1.7",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Gửi thông báo từ admin đến all box",
			en: "Send notification from admin to all box"
		},
		category: "owner",
		guide: {
			en: "{pn} <tin nhắn>"
		},
		envConfig: {
			delayPerGroup: 250
		}
	},

	langs: {
		vi: {
			missingMessage: "Vui lòng nhập tin nhắn bạn muốn gửi đến tất cả các nhóm",
			notification: "Thông báo từ admin bot đến tất cả nhóm chat (không phản hồi tin nhắn này)",
			sendingNotification: "Bắt đầu gửi thông báo từ admin bot đến %1 nhóm chat",
			sentNotification: "✅ Đã gửi thông báo đến %1 nhóm thành công",
			errorSendingNotification: "Có lỗi xảy ra khi gửi đến %1 nhóm:\n%2"
		},
		en: {
			missingMessage: "𝙑𝙚𝙪𝙞𝙡𝙡𝙚𝙧 𝙨𝙖𝙞𝙨𝙞𝙧 𝙫𝙤𝙩𝙧𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙥𝙤𝙪𝙧 𝙦𝙪𝙚 𝙟𝙚 𝙥𝙪𝙞𝙨𝙨𝙚 𝙡'𝙚𝙣𝙫𝙤𝙮𝙚𝙧 𝙖𝙪𝙭 𝙫𝙞𝙡𝙡𝙖𝙜𝙚𝙤𝙞𝙨",
			notification: "𝙈𝙀𝙎𝙎𝘼𝙂𝙀 𝙑𝙀𝙉𝘼𝙉𝙏 𝘿'𝙐𝙉 𝙃𝙊𝙆𝘼𝙂𝙀. 𝙑𝙀𝙐𝙄𝙇𝙇𝙀𝙕 𝙀𝙏𝙍𝙀 𝘼𝙏𝙏𝙀𝙉𝙏𝙄𝙁 \n[𝙋𝙤𝙪𝙧 𝙡𝙪𝙞 𝙧𝙚𝙥𝙤𝙣𝙙𝙧𝙚 𝙚𝙘𝙧𝙞𝙫𝙚𝙯 (★𝐜𝐚𝐥𝐥𝐚𝐝 + 𝐯𝐨𝐭𝐫𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞)..]",
			sendingNotification: "𝙅'𝙚𝙣𝙫𝙤𝙞𝙚 𝙫𝙤𝙩𝙧𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙖𝙪𝙭 %1 𝙫𝙞𝙡𝙡𝙖𝙜𝙚𝙨... 𝙑𝙚𝙪𝙞𝙡𝙡𝙚𝙯 𝙥𝙖𝙩𝙞𝙚𝙣𝙩𝙚𝙧",
			sentNotification: "✅𝙈𝙚𝙨𝙨𝙖𝙜𝙚 𝙚𝙣𝙫𝙤𝙮𝙚 𝙖𝙪𝙭 %1 𝙫𝙞𝙡𝙡𝙖𝙜𝙚𝙨 𝙖𝙫𝙚𝙘 𝙨𝙪𝙘𝙘𝙚𝙨",
			errorSendingNotification: "𝙀𝙘𝙝𝙚𝙘 𝙙𝙚 𝙡'𝙚𝙣𝙫𝙤𝙞 𝙙𝙚 𝙫𝙤𝙩𝙧𝙚 𝙢𝙚𝙨𝙨𝙖𝙜𝙚 𝙖 %1 𝙫𝙞𝙡𝙡𝙖𝙜𝙚(𝙨):\n%2"
		}
	},

	onStart: async function ({ message, api, event, args, commandName, envCommands, threadsData, getLang }) {
		const { delayPerGroup } = envCommands[commandName];
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const formSend = {
			body: `${getLang("notification")}\n═════════════════\n${args.join(" ")}\n═════════════════\n᯽..𝙉𝘼𝙍𝙐𝙏𝙊 𝙐𝙕𝙐𝙈𝘼𝙆𝙄..᯽`,
			attachment: await getStreamsFromAttachment(
				[
					...event.attachments,
					...(event.messageReply?.attachments || [])
				].filter(item => ["photo", "png", "animated_image", "video", "audio"].includes(item.type))
			)
		};

		const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
		message.reply(getLang("sendingNotification", allThreadID.length));

		let sendSucces = 0;
		const sendError = [];
		const wattingSend = [];

		for (const thread of allThreadID) {
			const tid = thread.threadID;
			try {
				wattingSend.push({
					threadID: tid,
					pending: api.sendMessage(formSend, tid)
				});
				await new Promise(resolve => setTimeout(resolve, delayPerGroup));
			}
			catch (e) {
				sendError.push(tid);
			}
		}

		for (const sended of wattingSend) {
			try {
				await sended.pending;
				sendSucces++;
			}
			catch (e) {
				const { errorDescription } = e;
				if (!sendError.some(item => item.errorDescription == errorDescription))
					sendError.push({
						threadIDs: [sended.threadID],
						errorDescription
					});
				else
					sendError.find(item => item.errorDescription == errorDescription).threadIDs.push(sended.threadID);
			}
		}

		let msg = "";
		if (sendSucces > 0)
			msg += getLang("sentNotification", sendSucces) + "\n";
		if (sendError.length > 0)
			msg += getLang("errorSendingNotification", sendError.reduce((a, b) => a + b.threadIDs.length, 0), sendError.reduce((a, b) => a + `\n - ${b.errorDescription}\n  + ${b.threadIDs.join("\n  + ")}`, ""));
		message.reply(msg);
	}
};
