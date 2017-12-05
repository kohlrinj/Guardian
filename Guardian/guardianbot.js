//Nick Kohlrieser
//Discord.js is how we talk to the Discord api. Use `npm install discordjs` to install this module.
const Discord = require('discord.js');
//bot is where the discord client pulls calls from the code
const bot = new Discord.Client();
//json file storing the two lists of channels you want to incorporate
const channels = require('./channels.json')
//json file holding your Discord bot login credentials and spreadsheet ID
const authorization = require('./auth.json')

//Googleapis is how we add to Sheets with the code. Use `npm install googleapis` to install this module.
const google = require('googleapis')
//This is the json file you get from adding a service account to your Google Cloud Platform account.
const credentials = require('./creds.json')

//This is where Google authenticates the service account.
const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    [
        'https://www.googleapis.com/auth/spreadsheets'
    ],
    null
)

google.options({auth})

//This choose the api version of sheets that we want.
const sheets = google.sheets('v4')
//pulls the spreadsheetid from your auth.json file
const spreadsheetId = authorization.spreadsheetId

//Using request to pull from websites.
var request = require("request");
//List of website apis we are using to posts random pictures.
//Each of these pulls a random image at each request.
var cat = "http://random.cat/meow.php"
var dog = "https://random.dog/woof"
var birb = "http://random.birb.pw/tweet/"
var shib = "http://shibe.online/api/shibes"
//Prefix that we will be using to call the bot. Change it to something else if it conflicts with another bot you are using.
const PREFIX = "!"


bot.on("message", function(message) {
    //After a bot sees a message, it makes sure it passes all these checks or else it returns.
    //The bot will ignore any messages it made itself to prevent loops.
    if (message.author.equals(bot.user))return;
    //The bot will ignore any messages that don't have the prefix.
    if (!message.content.startsWith(PREFIX)) return;
    //The bot will ignore if the message isn't in one of the command channes you specify in channels.json.
    if (!(channels.command.indexOf(message.channel.name) > -1)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    //The switch is used to define each command string.
    //Each command of cat, dog, bird, or shib will pull a picture of that respective animal.
    //Each uses embed to hide the link or is a directly linked file.
    //Legendary pulls a defined picture from imgur.com.
    switch (args[0].toLowerCase()) {
        case "cat":
            request({
                url: cat,
                json: true
            }, function (error, response, body) {
                message.channel.send(body);
            })
            break;
        case "legendary":
            message.channel.send({
                embed:{
                    image:{
                    url: `https://i.imgur.com/wnit9il.jpg`
                    }
                }
            })
        break;
        case "dog":
            request({
                url: dog,
                json: false
            }, function (error, response, body) {
                message.channel.send({
                    embed:{
                        image:{
                        url: `http://random.dog/${body}`
                        }
                    }
                })
            })
            break;
        case "birb":
        case "bird":
            request({
                url: birb,
                json: false
            }, function (error, response, body) {
                message.channel.send({
                    embed:{
                        image:{
                        url: `https://random.birb.pw/img/${body}`
                        }
                    }
                })
            })
            break;
        case "shib":
            request({
                url: shib,
                json: false
            }, function (error, response, body) {
                var slice = body.slice(2,77)
                message.channel.send({
                    embed:{
                        image:{
                        url: slice
                        }
                    }
                })
            })
            break;
        case "ping":
            message.channel.send('Pong!');
            break;
        case "commands":
            //Shows a clean looking document of commands.
            message.channel.send({embed: {
                color: 3447003,
                author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL
                },
                title: "Commands for Guardian bot",
                fields: [{
                    name: "!cat",
                    value: "Posts a random picture of a cat courtesy of random.cat."
                },
                {
                    name: "!dog",
                    value: "Posts a random picture of a dog courtesy of random.dog."
                },
                {
                    name: "!birb or !bird",
                    value: "Posts a random picture of a bird courtesy of random.birb.pw."
                },
                {
                    name: "!shib",
                    value: "Try it. I dare you."
                },
                {
                    name: "!ping",
                    value: 'Asks the bot to say "pong" back. *idk it\'s a computer thing*'
                },
                ],
                footer: {
                icon_url: bot.user.avatarURL,
                text: "Any suggestions? Contact Furdog :D"
                }
            }
            });
            break;
        default:
            //Any command message not matched to one of the above will pull this line of text informing the user that it made an incorrect command. 
            message.channel.send("Invalid command. Type !commands for a full list.")
    }
    //Command message is deleted 1000ms after it was seen by the bot.
    message.delete(1000);
});

bot.on("ready", () => {
    //This event will run if the bot starts, and logs in, successfully.
    //It polls the servers, channels and users it is connected to.
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`); 
    //Changing the bot's playing game to something useful. A small string works best.
    bot.user.setGame(`the original trilogy again`);
});

bot.on('message', (message) => {
    //As above the bot sees a message and it makes sure it is in the read channels in channels.json
    if(channels.read.indexOf(message.channel.name) > -1 ) {
        //The service account appends the values to a sheet document.
        //spreadsheetId is the spreadsheet you defined in your auth.json file.
        //range is the area you want the service account to commit messages to.
        //valueInputOption is to have the service account add data as if it were a user.
        //values are what is inserted into the document. In this case, it inserts the username
        //of the person sending the message, the channel name and what time it was created in UTC.
        sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!all',
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [[message.author.username, message.channel.name, message.createdAt]]
            }
        })
    }

})

//Your bot credentials added to auth.json.
bot.login(authorization.botlogin);