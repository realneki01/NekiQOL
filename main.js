/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
require("./features/webhook.js")
require("./features/macros.js")
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
    ChatLib.chat(`${args.slice(1).join(" ")}`)
    let testMsg = args.slice(1).join(" ")
    let msg = `This is some nice text **NYAA!**`
    if(args == "sendmsg"){
        postWebhook(SettingsNew.MAIN_WEBHOOK_URL, `${msg}`)
    }
    if(args == ""){
        ChatLib.chat(ChatLib.getChatBreak(`&b====================================================`))
        ChatLib.chat(ChatLib.getCenteredText(`&b&lNeko&7&lQOL`))
        ChatLib.chat(ChatLib.getCenteredText(`&7Module Developed by &bAzael&7 & &bSemiMute`))
        ChatLib.chat(`&c`)
        ChatLib.chat(`&7- &b/nekoqol config &9- &7&oNyopens nye config mewnnu to set nyany nekoqol setting`)
        ChatLib.chat(`&c`)
        ChatLib.chat(ChatLib.getChatBreak(`&b====================================================`))
    }
    if(args == "config"){
        SettingsNew.openGUI()
    }
}).setName(`nekoqol`)