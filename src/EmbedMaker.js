const { get } = require('superagent');
const { Canvas } = require('canvas-constructor');

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
                .setTextFont("italic 12px Vandana")
                .setColor("#FFFFFF")
                .addText("made by Duck#9999", 7, 60)
                .setTextFont("18px Vandana")
                .setColor('#7289DA')
                .addText("Name", 215, 108)
                .addText("Creator", 215, 158)
                .addText("Servers", 215, 208)
                .addText("Owner ID", 110, 259)
                .setColor("#FFFFFF")
                .addText("BOTSFORDISCORD.COM", 20, 26)
                .setTextAlign("right")
                .addText(botName.length > 12 ? "..." + botName.substring(botName.length - 12) : botName, 442, 108)
                .addText(ownerName.length > 11 ? "..." + ownerName.substring(ownerName.length - 11) : ownerName, 442, 158)
                .addText(botCount.length > 11 ? "..." + botCount.substring(botCount.length - 11) : botCount, 442, 208)
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