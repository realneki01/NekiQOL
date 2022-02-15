/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
require("./features/macros.js")
import { prefix } from "./features/macros.js"
import SettingsNew from "./config";
import request from "requestV2";

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
    if(args == "testwebhook"){
        postWebhook(`**NYAA~!** Testing the send webhook function..`)
    }
    if(args == ""){
        ChatLib.chat(ChatLib.getChatBreak(`&b====================================================`))
        ChatLib.chat(ChatLib.getCenteredText(`&b&lNeko&7&lQOL`))
        ChatLib.chat(ChatLib.getCenteredText(`&7Module Developed by &bAzael&7 & &bSemiMute`))
        ChatLib.chat(`&c`)
        ChatLib.chat(`&7- &b/nekoqol config &9- &7&oNyopens nye config mewnnu to set nyany nekoqol setting`)
        ChatLib.chat(`&7- &b/nekoqol testwebhook &9- &7&otest nyand myake sure your webhook settings nyare to your liking nyaa~!`)
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
}).setName(`nekoqol`)

register('worldLoad', () => {
    if (afk == true){
        if (new Date().getTime() - afktime.getTime() < 1000) return;
        postWebhook("Island change noticed, you should go back to AFK")
    }
})