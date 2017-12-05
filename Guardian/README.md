# Guardian Watcher Discord Bot
Watcher was created to help keep track of user's activity by submitting messages to a Google Sheet. It also adds a few fun commands that posts a random picture of an animal.

## How to install and use Watcher.
1. Install [discord.js](https://discord.js.org/#/) and [googleapis](https://www.npmjs.com/package/googleapis) on your node server.
2. Create a Google service account using https://support.google.com/a/answer/7378726?hl=en.
   - Enable the Sheets API.
   - Save that .json file in your default node directory and rename it creds.json.
   - Find the email address from that service account in the creds.json file and copy it.
3. Create a new Google Sheets document and share the document with the email address of the service account.
   - Grab the Sheets ID from the URL. It's the long string of random characters near the end.
     - Add that to the "spreadsheetId" section in the auth.json file.
   - Create a named range in the document named "all" and covering the entirety of the first three columns. https://support.google.com/docs/answer/63175?co=GENIE.Platform%3DDesktop&hl=en
4. Go to https://discordapp.com/developers open up "My Apps" on the left and create a new app.
   - Name it whatever you want and select the options you want.
   - Make the bot a "bot user".
   - Grab the token and fit it into the "botlogin" section of the auth.json file.
5. Add the bot a server you own by using https://discordapi.com/permissions.html.
   - The bot only needs the "read messages", "send messages", "manage messages", and "attach files" permissions.
   - Enter the client ID which you can find in your app's console on the Discord developer website.
     - Note: Your personal Discord account will need Two-factor authentication.
   - Use the generated link to add your bot to your server.
6. Run the bot using node.

Optional: Change the channels.json file to fit the channels of your server. By default it only uses the #general channel.