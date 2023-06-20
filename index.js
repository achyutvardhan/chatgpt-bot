const {Client, GatewayIntentBits, Events} = require('discord.js')
 require('dotenv').config();

const client = new Client({intents :[ 
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

const { OpenAIApi, Configuration} = require('openai')
const configuration = new Configuration({
    organization : process.env.OPEN_AI_ORG,
    apiKey : process.env.OPEN_AI_APIKEY,
})

const openai = new OpenAIApi(configuration);

client.on('messageCreate', async (message)=>{
    try {
         if(message.author.bot)return;
          
        const gptResponse = await openai.createCompletion({
            model: "davinci",
            prompt: `ChatGpt is a friendly chatbot.\n\
            ChatGpt : Hello , how are you?\n\
            ${message.author.username}:${message.content}\n\
            ChatGpt:`,
            temperature : 0.9,
            max_tokens : 100,
            stop : ["ChatGpt :" , "MYSTERY: "]
        })
        
         message.reply(`${gptResponse.data.choices[0].text}`);
         return;
        
    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.statusText)
        console.log(error)
    }
})

client.once(Events.ClientReady,()=>{
    console.log("server is ready")
})

client.login(process.env.Token)