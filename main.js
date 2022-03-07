/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
require("./features/macros.js")
require(`./features/myfilter.js`)
import { prefix, moveGui } from "./features/macros.js"
import SettingsNew from "./config";
import request from "requestV2";
import PogObject from "PogData";

// Java libraries, ignore these
const ActionListener = Java.type("java.awt.event.ActionListener");
const JFrame = Java.type("javax.swing.JFrame");
const JButton = Java.type("javax.swing.JButton");
const JTextField = Java.type("javax.swing.JTextField");
const JLabel = Java.type("javax.swing.JLabel");
const JPasswordField = Java.type("javax.swing.JPasswordField");
const JRadioButton = Java.type("javax.swing.JRadioButton");
const ButtonGroup = Java.type("javax.swing.ButtonGroup");
const JCheckBox = Java.type("java.swing.JCheckBox");
const Font = Java.type("java.awt.Font");
let afk = false
let afktime = new Date();

var key = new PogObject("NekoQOL", {
    keywords: [],
    apikey: "",
})
export{ key }

function postWebhook(data) {
    data = getPingWebhook(data)
    request({
        url: SettingsNew.MAIN_WEBHOOK_URL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            "User-Agent": "Mozilla/5.0"
        },
        body: {
            username: "NekoQOL Alerts",
            content: `${data}`,
            avatar_url: "https://cdn.discordapp.com/attachments/941853201941016666/942204435701047326/loli61_2.png"
        }
    });
}

function getPingWebhook(content) {
    let msg;
    if (SettingsNew.MAIN_WEBHOOK_DISCORD_ID !== undefined) {
        msg = `<@${SettingsNew.MAIN_WEBHOOK_DISCORD_ID}> ${content}`
    } else {
        msg = `${content}`
    }
    return msg;
}

// This is the external chat window
j = new JFrame("Chat");
textF = new JTextField("");
textF.setBounds(1, 1, 450, 40);
textF.setFont(new Font("Segoe UI", Font.PLAIN, 22));
textF.addActionListener(new ActionListener({
    actionPerformed: () => {
        ChatLib.say(textF.getText());
        textF.setText("");
    }
}));
j.add(textF);
j.setSize(467, 80);
j.setLayout(null);
register('command', () => {
    let c = new com.chattriggers.ctjs.utils.console.Console(null);

    let frame = c.class.getDeclaredField("frame");
    frame.setAccessible(true);

    frame.get(c).setTitle("Chat");
    c.showConsole();

    register("chat", (msg, event) => {
        c.println(msg.removeFormatting());
    }).setCriteria("${msg}");
    setTimeout(() => {
        j.setVisible(true);
        j.setAlwaysOnTop(true);
    }, 500);
}).setName("guichat");

register(`command`, (...args) => {
    let testMsg = args.slice(1).join(" ")
    let msg = `This is some nice text **NYAA!**`
    if(args == "moveSGUI"){
        moveGui.open()
    }
    if(args == "testwebhook"){
        postWebhook(`**NYAA~!** Testing the send webhook function..`)
    }
    if(args == ""){
        ChatLib.chat(ChatLib.getChatBreak(`&b====================================================`))
        ChatLib.chat(ChatLib.getCenteredText(`&b&lNeko&7&lQOL`))
        ChatLib.chat(ChatLib.getCenteredText(`&7Module Developed by &bAzael&7 & &bSemiMute`))
        ChatLib.chat(`&c`)
        ChatLib.chat(`&7- &b/nekoqol config &9- &7&oNyopens nye config mewnnu to set nyany nekoqol setting`)
        ChatLib.chat(`&7- &b/nekoqol filter &5- &7&oDecide what gets filtered nyout nyin chat nyaa~!`)
        ChatLib.chat(`&7- &b/nekoqol testwebhook &9- &7&oTest nyand myake sure your webhook settings nyare to your liking nyaa~!`)
        ChatLib.chat(`&7- &b/nekoqol afk &9- &7&oToggle nyalerts telling nyu nyif nyu're nyafk nyor mewot`)
        ChatLib.chat(`&c`)
        ChatLib.chat(ChatLib.getChatBreak(`&b====================================================`))
    }
    if(args == "config"){
        SettingsNew.openGUI()
    }
    if(args == "afk"){
        if (afk == false){
            afk = true
            ChatLib.chat(`${prefix} &aAFK Pings&f have been toggled &a&lON&f!`)
        }
        else if (afk == true){
            afk = false
            ChatLib.chat(`${prefix} &aAFK Pings&f have been toggled &c&lOFF&f!`)
        }
    }
    if(args == "sbDebug"){
        let score = Scoreboard.getLines()
        ChatLib.chat(`${score.toString()}`)
    }
    if(args[0] === "filter"){
        var test = args.slice(2).join(' ');
        test = test.toLowerCase()
        if (args[1] === "add") {
            if (args[2] !== undefined) {
                    if (key.keywords.includes(test)) {
                        if(SettingsNew.FUN_NEKO_MODE){
                            ChatLib.chat(`${prefix} &fNye keyword "&b${test}&r" &fnyis nyalready being filtered nyout!`)
                        } else {
                            ChatLib.chat(`${prefix} &fThe keyword "&b${test}&r" &fis already being filtered out!`)
                        }
                        return
                    }
                    if(test.includes(`"`)){
                        if(SettingsNew.FUN_NEKO_MODE){
                            ChatLib.chat(`${prefix} &cNYERROR: Phrase contains characters that myay break your data file...`)
                        } else {
                            ChatLib.chat(`${prefix} &cERROR: Phrase contains characters that may break your data file...`)
                        }
                        return
                    }
                    key.keywords.push(test)
                    key.save()
                    if(SettingsNew.FUN_NEKO_MODE){
                        ChatLib.chat(`${prefix} &fMessages with the phrase "&b${test}&f" will maow be filtered nyout nyaa~!`)
                    } else {
                        ChatLib.chat(`${prefix} &fMessages with the phrase "&b${test}&f" will now be filtered out!`)
                    }
            } else {
                if(SettingsNew.FUN_NEKO_MODE){
                    ChatLib.chat(`${prefix} &cNYERROR: Nyu cannot nyadd nothing tyo your filter nyaa~!`)
                } else {
                    ChatLib.chat(`${prefix} &cERROR: You cannot add nothing to your filter!`)
                }
            }
        } else if (args[1] === "remove") {
            if (args[2] !== undefined) {
                if (key.keywords.includes(test)) {
                    removekeyList(test)
                } else {
                    if (!key.keywords.includes(test)) {
                        if(SettingsNew.FUN_NEKO_MODE){
                            ChatLib.chat(`${prefix} &cNYERROR: Keyword "${test}" nyis mewot being filtered nyout meow~! try nyadding nyit with /nekoqol filter add ${test}`)
                        } else {
                            ChatLib.chat(`${prefix} &cERROR: Keyword "${test}" is not being filtered out! Try adding it with /nekoqol filter add ${test}`)
                        }
                            return
                    }
                }
            }
        } else if (args[1] === "list") {
            if (args[2] === undefined || args[2] < 1 || isNaN(args[2])) {
                args[2] = 1
            }
            const chat = new Message()
            let page = (args[2] - 1) * 10
            let limit = page + 10
            let totalPage = Math.ceil(key.keywords.length / 10)
            if (totalPage === 0) {
                if(SettingsNew.FUN_NEKO_MODE){
                    ChatLib.chat(`${prefix} &cNYERROR: Yu don't have nyany filters nyaa~! nyadd using &e/nekoqol filter add <filter>`)
                } else {
                    ChatLib.chat(`${prefix} &cERROR: You don't have any filters! Add using &e/nekoqol filter add <filter>`)
                }
                return
            }
            if (args[2] > totalPage) {
                if(SettingsNew.FUN_NEKO_MODE){
                    ChatLib.chat(`${prefix} &cNYERROR: There nyis nyo filter list page &e${args[2]}&c. Your total page nyis nyonly &e${totalPage}&c.`)
                } else {
                    ChatLib.chat(`${prefix} &cERROR: There is no filter list page &e${args[2]}&c. Your total page is only &e${totalPage}&c.`)
                }
                return
            }
            chat.addTextComponent(new TextComponent(`${prefix} &fMyFilter List `));
            let command1 = `/nekoqol filter list ${parseInt(args[2]) - 1}`
            let command2 = `/nekoqol filter list ${parseInt(args[2]) + 1}`
            if (args[2] > 1) {
                chat.addTextComponent(new TextComponent("&5<< ").setClick("run_command", command1));
            }
            chat.addTextComponent(new TextComponent(`&b[Page ${args[2]} of ${totalPage}]`));
            if (args[2] < totalPage) {
                chat.addTextComponent(new TextComponent(" &5>>").setClick("run_command", command2));
            }
            ChatLib.chat("&b" + ChatLib.getChatBreak("="))
            chat.chat()
            for (i = page; i < limit; i++) {
                if (key.keywords[i] !== undefined) {
                    let numList = i + 1
                    ChatLib.chat(`&5${numList}. &f${key.keywords[i]}`)
                }
            }
            ChatLib.chat("&b" + ChatLib.getChatBreak("="))
        } else if (args[1] === "clear") {
            key.keywords = []
            key.save()
            ChatLib.chat(`${prefix} &fSuccessfully cleared your filter list!`)
        } else {
            if(SettingsNew.FUN_NEKO_MODE){
                ChatLib.chat(`${prefix} &cNyinvalid Usage: &n/nekoqol filter <add/remove/clear/list> <filter>`)
            } else {
                ChatLib.chat(`${prefix} &cInvalid Usage: &n/nekoqol filter <add/remove/clear/list> <filter>`)
            }
        }
    }
}).setName(`nekoqol`)

register('worldLoad', () => {
    if (afk == true){
        if (new Date().getTime() - afktime.getTime() < 1000) return;
        postWebhook("Island change noticed, you should go back to AFK")
    }
})