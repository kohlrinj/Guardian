import gspread
import discord
from discord.ext.commands import Bot
from discord.ext import commands
from oauth2client.service_account import ServiceAccountCredentials

Client = discord.Client
bot_prefix = "?"
client = commands.Bot(command_prefix=bot_prefix)

@client.event
async def on_ready():
    print("Bot Online!")
    print("Name: {}".format(client.user.name))
    print("ID: {}".format(client.user.id))

@client.command(pass_context=True)
async def ping(ctx):
    await client.say("Pong!")

channels = [
    'haven-main-story',
    'asgard-main story',
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
]
# use creds to create a client to interact with the Google Drive API
scope = ['https://spreadsheets.google.com/feeds']
creds = ServiceAccountCredentials.from_json_keyfile_name('creds.json', scope)
shclient = gspread.authorize(creds)
 
# Find a workbook by name and open the first sheet
# Make sure you use the right name here.
sheet = shclient.open('GUARDIAN posts').sheet1
 
# Extract and print all of the values
@client.event
async def on_message(message):
    if message.channel.name in channels:
        row = [message.author, message.channel.name, message.timestamp]
        index = 1
        sheet.insert_row(row, index)

client.run(