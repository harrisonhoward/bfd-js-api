# bfd-js-api
Javascript Library made for Bots for Discord API

## How to Install
`npm install bfd-js-api`

## Documentation AutoPost
```js
const Discord = require("discord.js");
const client = new Discord.client();
const bfdapi = require('bfdapi');
const bfd = new bfdapi(client, 'Your BFD API Token', autopost /*(Enable AutoPost Stats? true or false)*/, intervalValue /*(in Seconds & Default to 30 Mins)*/);

//Events for AutoPost (Optional)
bfd.on('isPosted', (guildCount) => {
	console.log(`Successfully Posted ${guildCount} Guilds`);
});
bfd.on('isError', (error) => {
	console.log(`I have Errored!`);
});
```

## Documentation Methods
```js
.getBotStats(botID);
//returns a Promise<Object>
.getAllBots(isVerified)
//returns a Promise<Object>

.getUserStats(userID);
//returns a Promise<Object>
.getAllUsers()
//returns a Promise<Object>
```

## Supported Libraries 
Discord.js
<br />
Eris