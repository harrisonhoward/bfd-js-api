const EventEmitter = require('events');
const AutoPost = require("./AutoPost.js");
const Request = require("./Request.js");
const EmbedMaker = require("./EmbedMaker.js");
const APIURL = 'https://botsfordiscord.com/api/v1/';

class bfdAPI extends EventEmitter {
    /**
     * New Instance
     * @param {any} client The Client Instance
     * @param {string} token The API Token
     * @param {boolean} autopost If It Will AutoPost
     * @param {number} intervalValue The Length of Interval (Seconds)
     * 
     */
    constructor(client, token, autopost, intervalValue) {
        super();
        this.client = client;
        this.token = token;
        intervalValue = intervalValue || 1800;

        if (client && autopost) {
            if (intervalValue > 86400) {
                throw new Error('intervalValue cannot exceed 86400 Seconds (24 Hours)');
            } else if (intervalValue < 60) {
                throw new Error('intervalValue cannot be smaller than 60 Seconds (1 Minute)');
            }

            /**
             * @event posted Event Posted
             * @param {number} guildCount Guild Count Posted
             */

            /**
             * @event error Event Error
             * @param {error} error The Error
             */

            intervalValue * 1000;
            this.client.on('ready', () => {
                AutoPost.Post(this.client, APIURL + 'bots/{clientID}', this.token)
                    .then(() => this.emit('posted', this.client.guilds.size))
                    .catch((err) => this.emit('error', err));
                setInterval(() => {
                    AutoPost.Post(this.client, APIURL + 'bots/{clientID}', this.token)
                        .then(() => this.emit('posted', this.client.guilds.size))
                        .catch((err) => this.emit('error', err));
                }, intervalValue);
            });
        } else if (!client && autopost) {
            throw new Error("The 'client' you provided is invalid. Disable 'autopost' to remove this error.");
        }
    }

    /**
     * @param {string} botID Bot's ID
     */
    async getBotStats(botID) {
        if (!botID) {
            throw new Error('You need to provide an ID for getBotStats [ .getBotStats(botID) ]');
        }
        const res = await Request.request(`${APIURL}bots/${botID}`);
        if (res.text === '{}') {
            throw new Error('Invalid ID provided for getBotStats [ .getBotStats(botID) ]');
        }
        return res.body;
    }
    /**
     * @param {Object} [options] The Options Available
     * @param {boolean} [options.isVerified] Filter by Verified Bots
     */
    async getAllBots(options = false) {
        if (typeof options !== "boolean") {
            options = false;
        }
        const res = await Request.request(`${APIURL}bots`);
        let botArray = [];
        for (const bot of res.body) {
            if (options && bot.verified) {
                botArray.push(bot);
            } else if (!options) {
                botArray.push(bot)
            }
        }
        return botArray;
    }
    /**
     * @param {string} botID Bot's ID
     */
    async getBotEmbed(botID) {
        if (!botID) {
            throw new Error('You need to provide an ID for getBotEmbed [ .getBotEmbed(botID) ]');
        }
        const res = await Request.request(`${APIURL}bots/${botID}/`);
        if (res.text === '{}') {
            throw new Error('Invalid ID provided for getBotEmbed [ .getBotEmbed(botID) ]');
        }
        return EmbedMaker.Embed(res.body);
    }

    /**
     * @param {string} userID User's ID
     */
    async getUserStats(userID) {
        if (!userID) {
            throw new Error('You need to provide an ID for getUserStats [ .getUserStats(userID) ]');
        }
        const res = await Request.request(`${APIURL}bots`);
        let botArray = [];
        for (const bot of res.body) {
            if (bot.owner === userID) {
                botArray.push(bot);
            }
        }
        if (botArray.length < 1) {
            throw new Error('The User ID provided has no Bots for getUserStats');
        }
        return botArray;
    }
    async getAllUsers() {
        const res = await Request.request(`${APIURL}bots`);
        let userArray = [];
        loop:
        for (const bot of res.body) {
            let userJSON = {};
            userJSON["id"] = bot.owner;
            userJSON["username"] = bot.ownername;
            userJSON["tag"] = bot.ownernametwo;
            for (let user of userArray) {
                if (user.id === userJSON["id"]) {
                    continue loop;
                }
            }
            userArray.push(userJSON);
        }
        return userArray;
    }
}

module.exports = bfdAPI;