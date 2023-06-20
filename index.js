const {Client, GatewayIntentBits} = require('discord.js')
const {token} = require('dotenv').config();

const client = new Client({intents : GatewayIntentBits.Guilds})