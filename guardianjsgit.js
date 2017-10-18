const Discord = require('discord.js');
const bot = new Discord.Client();

const google = require('googleapis')
const credentials = require('./creds.json')

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
const spreadsheetId = '1HEq7egPjgCLJcHlqpdJnDw1XrNYWUdfU44vuLlH2sNU'



//auth.authorize((err, tokens) => {
//     console.log(tokens)
//})

bot.on('message', (message) => {
    if(message.content == 'ping') {
        message.reply('pong');
    }
});

bot.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`); 
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    bot.user.setGame(`on ${bot.guilds.size} servers`);
});

let channels = [
    'haven-main-story',
    'asgard-main-story',
    'aegis-main-story',
    'aegis-main-story-two',
    'muramasa-main-story',
    'muramasa-main-story-two',
    'muramasa-side-story',
    'muramasa-side-story-two',
    'gandiva-main-story',
    'gandiva-main-story-two',
    'gandiva-side-story',
    'avalon-main-story',
    'avalon-main-story-two',
    'libra-main-story',
    'haven-stories',
    'haven-astral-district',
    'haven-glastone-market',
    'haven-hyperion-center',
    'haven-martius-spaceport',
    'haven-octavian-street',
    'haven-residential-district',
    'haven-security-base',
    'haven-zion-wilderness',
    'alexandria-station',
    'tartarus-station',
    'haven-free-location',
    'asgard-elite-interviews',
    'asgard-classroom',
    'asgard-recreation-room',
    'asgard-gym',
    'asgard-cafeteria',
    'asgard-archives',
    'asgard-biodome',
    'asgard-hangar-bay',
    'asgard-shield-bunk',
    'asgard-sword-bunk',
    'asgard-bow-bunk',
    'asgard-scabbard-bunk',
    'asgard-stories',
    'asgard-engineering',
    'asgard-trainer-office',
    'asgard-range',
    'aegis-stories',
    'aegis-operations',
    'aegis-cultural-center',
    'aegis-residential-block',
    'aegis-botanical-gardens',
    'aegis-eris-lounge',
    'aegis-hangar-bay',
    'aegis-marketplace',
    'aegis-free-location',
    'muramasa-stories',
    'muramasa-captain-cabin',
    'muramasa-executive-officer-office',
    'muramasa-bridge',
    'muramasa-crew-deck',
    'muramasa-armory',
    'muramasa-gym',
    'muramasa-engineering',
    'muramasa-shuttle-bay',
    'muramasa-free-location',
    'gandiva-stories',
    'gandiva-captain-cabin',
    'gandiva-combat-information-center',
    'gandiva-crew-quarters',
    'gandiva-engineering',
    'gandiva-armory',
    'gandiva-hangar',
    'gandiva-free-location',
    'avalon-stories',
    'avalon-captain-cabin',
    'avalon-bridge',
    'avalon-crew-quarters',
    'avalon-tech-lab',
    'avalon-bio-lab',
    'avalon-cargo-bay',
    'avalon-free-location',
    'avalon-development-one',
    'avalon-development-two',
    'libra-stories',
    'libra-captain-cabin',
    'libra-exectutive-officer-office',
    'libra-bridge',
    'libra-crew-quarters',
    'libra-wing-stations',
    'libra-engineering',
    'libra-cargo-deck',
    'libra-free-location',
    'astral-studios-one',
    'astral-studios-two',
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

bot.login("Insert_Token_Here");