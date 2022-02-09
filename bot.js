const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');

const commands = [
  {
    name: 'timeoutroulette',
    description: 'Timeouts a random person for a random amout of time!',
  },
];

const rest = new REST({ version: '9' }).setToken(config.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(
        '941060099525468260',
        '323889369205309440'
      ),
      {
        body: commands,
      }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'timeoutroulette') {
    var memberlist = await interaction.guild.members.list({ limit: 1000 });
    var members = [];
    memberlist.forEach((member) => {
      members.push(member.user.id);
    });
    var selectedID = members[Math.floor(Math.random() * members.length)];
    var options = ['60 seconds', '5 minutes', '10 minutes', '1 Day', '1 Week'];
    var selectedTimeout = options[Math.floor(Math.random() * options.length)];
    interaction.reply(
      `<@${selectedID}> should be timeouted ${selectedTimeout}!`
    );
  }
});

client.login(config.TOKEN);
