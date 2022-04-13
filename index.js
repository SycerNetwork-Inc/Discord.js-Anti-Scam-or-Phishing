process.on('uncaughtException', function (exception) { });
console.clear();
console.log(`
███████╗██╗   ██╗ ██████╗███████╗██████╗ ███╗   ██╗███████╗████████╗██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗
██╔════╝╚██╗ ██╔╝██╔════╝██╔════╝██╔══██╗████╗  ██║██╔════╝╚══██╔══╝██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝
███████╗ ╚████╔╝ ██║     █████╗  ██████╔╝██╔██╗ ██║█████╗     ██║   ██║ █╗ ██║██║   ██║██████╔╝█████╔╝ 
╚════██║  ╚██╔╝  ██║     ██╔══╝  ██╔══██╗██║╚██╗██║██╔══╝     ██║   ██║███╗██║██║   ██║██╔══██╗██╔═██╗ 
███████║   ██║   ╚██████╗███████╗██║  ██║██║ ╚████║███████╗   ██║   ╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗
╚══════╝   ╚═╝    ╚═════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝    ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
                   Discord Anti Scam or Phishing By TinnerX Javascript 
`)

const Discord = require("discord.js");
const { Blacklist } = require('./Blacklist.json')
const urls = require('url');
const { Token } = require('./config.json')
const regpart2 = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=\-]{2,256}\.[a-z,\-]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/ig

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});
client.on('ready', async (message) => {
    console.log(`Bot ตัวที่รันชื่อ ${client.user.username}`)
    console.log('================================')
    console.log()
})
client.on('message', message => {
    if (client.user.id === message.author.id) return;

    const regpart2 = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=\-]{2,256}\.[a-z,\-]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/igm
    const regsub = /(?<protocol>\w*)\:\/\/(?:(?:(?<thld>[\w\-]*)(?:\.))?(?<sld>[\w\-]*))\.(?<tld>\w*)(?:\:(?<port>\d*))?/igm
    async function clus(urlin) {
        for (let index = 0; index < urlin?.length; index++) {
            let datas = urls.parse(urlin[index])["hostname"]
            if (datas === undefined || datas === null) {
                datas = urls.parse(urlin[index])["href"]
                if (datas.match(regsub) !== null) {
                    datas = datas.match(regsub)[0]
                }
            } else {
                datas = `https://${datas}`
                datas = urls.parse(datas)['hostname']
            }

            if (Blacklist.includes(datas)) {
                message.delete()
                    .then(data => { message.channel.send(`<@${message.author.id}> โดเมน ${datas} ถูก Blacklist`) })
                    .catch(data => { message.channel.send(`@here ข้อความด้านบน มีความอันตราย คำที่ตรวจเจอ ( ${datas} )`) })
                break;
            }
        }
    }
    if (JSON.stringify(message).match(regpart2) !== null) { clus(JSON.stringify(message).match(regpart2)) }
})
client.login(Token).then(data => console.log('Bot ได้ทำการ Login เป็นที่เรียบร้อย')).catch(data => console.log('ไม่สามารถเข้าใช้งานบอทได้ อาจ Token ผิด หรือ หมดอายุ'))