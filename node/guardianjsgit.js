const Discord = require('discord.js');
const bot = new Discord.Client();

const google = require('googleapis')
const credentials = require('./credentials.json')

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

const sheets = google.sheets('v4')
const spreadsheetId = 



//auth.authorize((err, tokens) => {
//     console.log(tokens)
//})

bot.on('message', (message) => {
    if(message.content == 'ping') {
        message.reply('pong');
    }
});

let channels = [
    'aegis-main-story',
    'aegis-main-story-two',
    'muramasa-main-story',
    'muramasa-main-story-two',
    'muramasa-side-story',
    'muramasa-side-story-two',
    'gandiva-main-story',
    'gandiva-main-story-two',
    'avalon-main-story',
    'avalon-main-story-two',
    'libra-main-story',
    'aegis-operations',
    'aegis-cultural-center',
    'aegis-residential-block',
    'aegis-botanical-gardens',
    'aegis-eris-lounge',
    'aegis-hangar-bay',
    'aegis-marketplace',
    'muramasa-one',
    'muramasa-two',
    'muramasa-three',
    'muramasa-four',
    'muramasa-five',
    'muramasa-six',
    'muramasa-seven',
    'gandiva-one',
    'gandiva-two',
    'gandiva-three',
    'gandiva-four',
    'gandiva-five',
    'avalon-one',
    'avalon-two',
    'avalon-three',
    'avalon-four',
    'avalon-five',
    'avalon-six',
    'avalon-development-one',
    'avalon-development-two',
    'libra-one',
    'libra-two',
    'libra-three',
    'libra-four',
    'libra-five',
    'astral-studios-one',
    'tartarus-station-one',
    'tartarus-station-two',
    'alexandria-station-one',
    'alexandria-station-two',
    'citadel-one',
];

bot.on('message', (message) => {
    if(channels.indexOf(message.channel.name) > -1 ) {
        sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'posts!all',
            valueInputOption: 'USER_ENTERED',
            //includeAllValuesInResponse: true,
            resource: {
                values: [[message.author.username, message.channel.name, message.createdAt, ]]
            }
        })
    }

})

bot.login(