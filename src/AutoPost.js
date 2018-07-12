const { post } = require('superagent');

class AutoPost {
    static async Post(client, URL, TOKEN) {
        const clientID = client.user.id
        const guildCount = client.guilds.size;
        try {
            await post(URL.replace('{clientID}', clientID))
                .set({ 'Authorization': TOKEN })
                .send({
                    server_count: Number(guildCount)
                });
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = AutoPost;