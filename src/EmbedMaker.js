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
                .addCircle(105, 157.5, 62)
                .addRect(205, 92, 250, 30)
                .addRect(205, 142, 250, 30)
                .addRect(205, 192, 250, 30)
                .addRect(100, 237, 355, 30)
                .setColor('#7289DA')
                .addRect(0, 0, 500, 40)
                .setTextAlign("left")
                .setTextFont("italic 12px Vandana")
                .setColor("#FFFFFF")
                .addText("made by Duck#9999", 7, 60)
                .setTextFont("18px Vandana")
                .setColor('#7289DA')
                .addText("Name", 215, 113)
                .addText("Creator", 215, 163)
                .addText("Servers", 215, 213)
                .addText("Owner ID", 110, 259)
                .setColor("#FFFFFF")
                .addText("BOTSFORDISCORD.COM", 20, 26)
                .setTextAlign("right")
                .addText(ownerName, 442, 113)
                .addText(botName, 442, 163)
                .addText(botCount, 442, 213)
                .addText(bot.owner, 442, 259)
                .restore()
                .addRoundImage(avatar, 40, 96, 128, 128, 64)
                .toBuffer();
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = AutoPost;