const { get } = require('superagent');
const { Canvas } = require('canvas-constructor');
const format = require("format-number");

class AutoPost {
    static async Embed(bot) {
        try {
            const { body: avatar } = await get(bot.avatar + "?size=128");
            const ownerName = bot.ownernametwo ? bot.ownernametwo : bot.ownername ? bot.ownername : "Invalid";
            const botName = bot.name;
            const botCount = bot.count.toLocaleString('us-en', { useGrouping: true });
            return new Canvas(500, 280)
                .setColor('#1E2020')
                .addRect(0, 0, 500, 280)
                .save()
                .setShadowColor("rgba(22, 22, 22, 1)")
                .setShadowOffsetY(5)
                .setShadowBlur(10)
                .addCircle(105, 152.5, 62)
                .addRect(205, 87, 250, 30)
                .addRect(205, 137, 250, 30)
                .addRect(205, 187, 250, 30)
                .addRect(100, 237, 355, 30)
                .setColor('#7289DA')
                .addRect(0, 0, 500, 40)
                .setTextAlign("left")
                .setTextFont("18px Verdana")
                .addText("Name", 215, 109)
                .addText("Creator", 215, 159)
                .addText("Servers", 215, 209)
                .addText("Owner ID", 110, 259)
                .setColor("#FFFFFF")
                .addText("BOTSFORDISCORD.COM", 20, 26)
                .setTextAlign("right")
                .addText(botName.length > 16 ? "..." + botName.substring(botName.length - 16, botName.length) : botName, 442, 109)
                .addText(ownerName.length > 14 ? "..." + ownerName.substring(ownerName.length - 14, ownerName.length) : ownerName, 442, 159)
                .addText(botCount.length > 14 ? "..." + botCount.substring(botCount.length - 14, botCount.length) : botCount, 442, 209)
                .addText(bot.owner, 442, 259)
                .restore()
                .addRoundImage(avatar, 40, 91, 128, 128, 64)
                .toBuffer();
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = AutoPost;