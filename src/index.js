const EventEmitter = require('events');
const AutoPost = require("./AutoPost.js");
const Request = require("./Request.js");
const APIURL = 'https://botsfordiscord.com/api/';

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

            intervalValue = intervalValue * 1000;
            this.client.on('ready', () => {
                AutoPost.Post(this.client, APIURL + 'bot/{clientID}', this.token)
                    .then(() => this.emit('posted', this.client.guilds.size))
                    .catch((err) => this.emit('error', err));
                setInterval(() => {
                    AutoPost.Post(this.client, APIURL + 'bot/{clientID}', this.token)
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
        var res = await Request.request(`${APIURL}bot/${botID}`);
        return res.body;
    }
    /**
     * @param {string} botID Bot's ID
     */
    async getBotEmbed(botID) {
        if (!botID) {
            throw new Error('You need to provide an ID for getBotEmbed [ .getBotEmbed(botID) ]');
        }
        var res = await Request.request(`${APIURL}bot/${botID}/widget`);
        return res.body;
    }

    /**
     * @param {string} userID User's ID
     */
    async getUserBots(userID) {
        if (!userID) {
            throw new Error('You need to provide an ID for getUserBots [ .getUserBots(userID) ]');
        }
        var res = await Request.request(`${APIURL}user/${userID}/bots`);
        return res.body;
    }

    /**
     * @param {string} userID User's ID
     */
    async getUserStats(userID) {
        if (!userID) {
            throw new Error('You need to provide an ID for getUserStats [ .getUserStats(userID) ]');
        }
        var res = await Request.request(`${APIURL}user/${userID}`);
        return res.body;
    }
}

module.exports = bfdAPI;