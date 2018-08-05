const { post } = require('superagent');

class AutoPost {
    static async Post(client, URL, TOKEN) {
        try {
            const clientID = client.user.id
            const guildCount = client.guilds.size;
            await post(URL.replace('{clientID}', clientID))
                .set({ 'Authorization': TOKEN })
                .send({
                    server_count: Number(guildCount)
                });
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = AutoPost;