process.on('uncaughtException', function (exception) {});

import { Client } from "discord.js";
import * as urls from "url";
import { Token } from "./config.json";
import { Blacklist } from "./Blacklist.json";

const regpart2 = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=\-]{2,256}\.[a-z,\-]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/ig

console.clear();

let text: string = `
███████╗██╗   ██╗ ██████╗███████╗██████╗ ███╗   ██╗███████╗████████╗██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗\n
██╔════╝╚██╗ ██╔╝██╔════╝██╔════╝██╔══██╗████╗  ██║██╔════╝╚══██╔══╝██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝\n
███████╗ ╚████╔╝ ██║     █████╗  ██████╔╝██╔██╗ ██║█████╗     ██║   ██║ █╗ ██║██║   ██║██████╔╝█████╔╝ \n
╚════██║  ╚██╔╝  ██║     ██╔══╝  ██╔══██╗██║╚██╗██║██╔══╝     ██║   ██║███╗██║██║   ██║██╔══██╗██╔═██╗ \n
███████║   ██║   ╚██████╗███████╗██║  ██║██║ ╚████║███████╗   ██║   ╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗\n
╚══════╝   ╚═╝    ╚═════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝    ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝\n
                   Discord Anti Scam or Phishing By TinnerX TypeScript
`;

console.log(text);

(async () => {
  const client = new Client({
    intents: [
      "GUILDS",
      "GUILD_MESSAGES"
    ]
  });

  await client.login(Token).then(data => console.log('Bot ได้ทำการ Login เป็นที่เรียบร้อย')).catch(data => console.log('ไม่สามารถเข้าใช้งานบอทได้ อาจ Token ผิด หรือ หมดอายุ'))

  await client.on('ready', async () => {
    console.log(`Bot ${client.user.username} Run StartUp`)
    console.log('================================')
    console.log()
  })

  await client.on('message', async (message) => {
    if (client.user.id === message.author.id) return;
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
            if (index === 0) {
              message.delete()
                .then(data => { message.channel.send(`<@${message.author.id}> โดเมน ${datas[datas.length - 2]}.${datas[datas.length - 1]} ถูก Blacklist`), datas = [] })
                .catch(data => { message.channel.send(`@here ข้อความด้านบน มีความอันตราย คำที่ตรวจเจอ ( ${datas[datas.length - 2]}.${datas[datas.length - 1]} )`) })
            }
          }
        } else {
          if (Blacklist.includes(`${datas[datas.length - 2]}.${datas[datas.length - 1]}`)) {
            if (index === 0) {
              message.delete()
                .then(data => { message.channel.send(`<@${message.author.id}> โดเมน ${datas[datas.length - 2]}.${datas[datas.length - 1]} ถูก Blacklist`), datas = [] })
                .catch(data => { message.channel.send(`@here ข้อความด้านบน มีความอันตราย คำที่ตรวจเจอ ( ${datas[datas.length - 2]}.${datas[datas.length - 1]} )`) })
            }
          }
        }

      }
    }
    report();
  })


})();