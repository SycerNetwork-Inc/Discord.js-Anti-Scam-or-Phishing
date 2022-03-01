process.on('uncaughtException', function (exception) {});
console.clear();
console.log(`
███████╗██╗   ██╗ ██████╗███████╗██████╗ ███╗   ██╗███████╗████████╗██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗
██╔════╝╚██╗ ██╔╝██╔════╝██╔════╝██╔══██╗████╗  ██║██╔════╝╚══██╔══╝██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝
███████╗ ╚████╔╝ ██║     █████╗  ██████╔╝██╔██╗ ██║█████╗     ██║   ██║ █╗ ██║██║   ██║██████╔╝█████╔╝ 
╚════██║  ╚██╔╝  ██║     ██╔══╝  ██╔══██╗██║╚██╗██║██╔══╝     ██║   ██║███╗██║██║   ██║██╔══██╗██╔═██╗ 
███████║   ██║   ╚██████╗███████╗██║  ██║██║ ╚████║███████╗   ██║   ╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗
╚══════╝   ╚═╝    ╚═════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝    ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
                   Discord Anti Scam or Phishing By TinnerX                                                                                    
`)

const Discord = require("discord.js");
const { Token } = require('./config.json')
const { Blacklist } = require('./Blacklist.json')
const urls = require('url');
// const datas = new Array()
const regpart2 = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=\-]{2,256}\.[a-z,\-]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/ig

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});

client.on('ready', async () => {
    console.log(`Bot ${client.user.username} Run StartUp`)
    console.log('================================')
    console.log()
})

client.on('message', message => {
    if (client.user.id === message.author.id) return;
    //console.log(message)
    if (message.content.match(regpart2) !== null) { clus(message.content.match(regpart2)) }

    async function report() {
        let data = [];
        for (let index = 0; index < message.embeds.length; index++) {
            data = (JSON.stringify(message.embeds[index]) + JSON.stringify(message.embeds[index]["fields"])).match(regpart2)
            clus(data)
        }
    }

    async function clus(urlin) {
        for (let index = 0; index < urlin?.length; index++) {
            let datas = urls.parse(urlin[index])["hostname"]?.split('.')
            if (datas === undefined) {
                datas = urls.parse(urlin[index])["href"].split('/')
                datas = datas[0].split('.')
                if (Blacklist.includes(`${datas[datas.length - 2]}.${datas[datas.length - 1]}`)) {
                    try {
                        if (index === 0) {
                            message.delete()
                            message.channel.send(`<@${message.author.id}> โดเมน ${datas[datas.length - 2]}.${datas[datas.length - 1]} ถูก Blacklist`);
                            datas = []
                        }
                    } catch (error) { }
                }
            } else {
                if (Blacklist.includes(`${datas[datas.length - 2]}.${datas[datas.length - 1]}`)) {
                    try {
                        if (index === 0) {
                            message.delete()
                            message.channel.send(`<@${message.author.id}> โดเมน ${datas[datas.length - 2]}.${datas[datas.length - 1]} ถูก Blacklist`);
                            datas = []
                        }
                    } catch (error) { }
                }
            }

        }
    }

    report();
})

client.login(Token);