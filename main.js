/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
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
const mc = Client.getMinecraft();
// Specified keybinds, pretty self explanitory
const forwardBind = new KeyBind(mc.field_71474_y.field_74351_w);
const backwardBind = new KeyBind(mc.field_71474_y.field_74368_y);
const leftBind = new KeyBind(mc.field_71474_y.field_74370_x);
const rightBind = new KeyBind(mc.field_71474_y.field_74366_z);
const sneakBind = new KeyBind(mc.field_71474_y.field_74311_E);
// Veriables, in case you want to add macros
var getBlock
var lastY
let click = false
var cane = false;
var cobble = false;
var smacro = false;
var lastTurnAround = new Date();
let isReconnecting = false
let randomshit = false

let prefix = "&8[&b&lNeko&7&lQOL&8]"
const CobbleMacroBind = new KeyBind("Toggle Cobble macro", Keyboard.KEY_NONE, "NekoQOL")
const SMacroBind = new KeyBind("Toggle S Farm macro", Keyboard.KEY_NONE, "NekoQOL")
const CaneMacrokeyBind = new KeyBind("Toggle Cane macro", Keyboard.KEY_NONE, "NekoQOL")
const sendClickBlockToController = Client.getMinecraft().getClass().getDeclaredMethod("func_147115_a", java.lang.Boolean.TYPE);
sendClickBlockToController.setAccessible(true);
const webhookURL = SettingsNew.MAIN_WEBHOOK_URL


function postWebhook(url,data){
    data = getPingWebhook(data)
    request({
        url: url,
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            "User-Agent":"Mozilla/5.0"
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
    if(SettingsNew.MAIN_WEBHOOK_DISCORD_ID !== undefined){
        msg = `<@${SettingsNew.MAIN_WEBHOOK_DISCORD_ID}> ${content}`
    } else {
        msg = `${content}`
    }
    return msg;
}

// Island checks
const isInHub = () => {
    return Scoreboard.getLines()?.find(l => l.toString().includes("Village")) !== undefined;
}

const isInIsland = () => {
    return Scoreboard.getLines()?.find(l => l.toString().includes("Your island")) !== undefined;
}

const isInLobby = () => {
    let i = Player.getInventory().getStackInSlot(0);
    let i2 = Player.getInventory().getStackInSlot(4);
    if (i.getID() === -1 || i2.getID() === -1) return false;
    if (i.getRegistryName() === "minecraft:compass" && i2.getRegistryName() === "minecraft:trapped_chest") return true;
    return false;
}

const isInLimbo = () => {
    if (
        World.getBlockAt(-21, 32, 21).getType().getRegistryName() === "minecraft:wall_sign" &&
        World.getBlockAt(-22, 31, 21).getType().getRegistryName() === "minecraft:carpet" &&
        World.getBlockAt(-25, 31, 21).getType().getRegistryName() === "minecraft:spruce_stairs"
    ) return true;
    return false;
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


register("tick", () => {
    lastY = getBlock
    getBlock = Player.getY()
    const item = Player.getHeldItem();
    getBlockZ = Math.round(Player.getZ())
    getBlockX = Math.round(Player.getX())
    // This is to turn off all defined macros, if you add any macro on your own add it to here, so it turns off in case you open a menu

    if (Client.currentGui.get() !== null) {
        if (cobble) {
            ChatLib.chat("§c[Aza's Macro] §4All Macros Toggled Off! OwO")

            click = false
            rightBind.setState(false)
            leftBind.setState(false)
            forwardBind.setState(false)
            backwardBind.setState(false)
            cobble = false
            cane = false
            smacro = false
            return;
        }
        if (smacro) {
            ChatLib.chat("§c[Aza's Macro] §4All Macros Toggled Off! OwO")

            click = false
            rightBind.setState(false)
            leftBind.setState(false)
            forwardBind.setState(false)
            backwardBind.setState(false)
            cobble = false
            cane = false
            smacro = false
            return;
        }
        if (cane) {
            ChatLib.chat("§c[Aza's Macro] §4All Macros Toggled Off! OwO")

            click = false
            rightBind.setState(false)
            leftBind.setState(false)
            forwardBind.setState(false)
            backwardBind.setState(false)
            cobble = false
            cane = false
            smacro = false
            return;
        }
    }
    // Cobble macro toggle
    if (CobbleMacroBind.isPressed()) {
        if (cobble == false) {
            cobble = true
            ChatLib.chat("§c[Aza's Macro] §aCobble Macro Toggled On! OwO")
            click = true
            forwardBind.setState(true)
        }
        else if (cobble == true) {
            cobble = false
            ChatLib.chat("§c[Aza's Macro] §4Cobble Macro Toggled Off! OwO")
            click = false
            forwardBind.setState(false)
        }
    }
    // S Macro toggle
    if (SMacroBind.isPressed()) {
        if (smacro == false) {
            smacro = true
            ChatLib.chat(`${prefix} &aS Shaped Macro&f has been toggled &a&lON&f!`)
            click = true
            rightBind.setState(true)
            forwardBind.setState(true)
        }
        else if (smacro == true) {
            smacro = false
            ChatLib.chat(`${prefix} &aS Shaped Macro&f has been toggled &c&lOFF&f!`)
            click = false
            rightBind.setState(false)
            leftBind.setState(false)
            forwardBind.setState(false)
        }
    }

    // S Macro turning around and "failsafe"
    if (smacro == true) {
        if (lastY != getBlock) {
            if (new Date().getTime() - lastTurnAround.getTime() < 1000) return;
            lastTurnAround = new Date();
            if (rightBind.isKeyDown()) {
                rightBind.setState(false);
                leftBind.setState(true);
                setTimeout(() => {
                    ChatLib.say(`/sethome`)
                }, 1000);
            }
            else if (leftBind.isKeyDown()) {
                leftBind.setState(false);
                rightBind.setState(true);
                setTimeout(() => {
                    ChatLib.say(`/sethome`)
                }, 1000);
            }
        }
        if (new Date().getTime() - lastTurnAround.getTime() > 60000) {
            lastTurnAround = new Date();
            if (rightBind.isKeyDown()) {
                rightBind.setState(false);
                leftBind.setState(true);
            }
            else if (leftBind.isKeyDown()) {
                leftBind.setState(false);
                rightBind.setState(true);
            }
        }
        if (isReconnecting == false && randomshit == true) {
            Player.getPlayer().field_70177_z = 90
            click = true
            sneakBind.setState(false)
            leftBind.setState(false);
            rightBind.setState(true);
            randomshit = false
        }
    }
    if (click == true) {
        sendClickBlockToController.invoke(Client.getMinecraft(), true);
    }
    // Cane macro toggle
    if (CaneMacrokeyBind.isPressed()) {
        if (cane == false) {
            cane = true
            ChatLib.chat(`${prefix} &aCane Macro&f has been toggled &a&lON&f!`)
            click = true
        }
        else if (cane == true) {
            cane = false
            ChatLib.chat(`${prefix} &aCane Macro&f has been toggled &c&lOFF&f!`)
            click = false
            rightBind.setState(false)
            leftBind.setState(false)
            forwardBind.setState(false)
            backwardBind.setState(false)
        }
    }
    // Cane macro settings, change the getBlockZ == "num" to whatever coordinates that are in the cane farm's edges (the outside barrier coordinates)
    // If your cane farm is oriented in X direction, might need to edit this a bit, if you can't figure it out dm me on discord @Azael#0315
    if (getBlockZ == "80" && cane) {
        if (new Date().getTime() - lastTurnAround.getTime() < 1000) return;
        lastTurnAround = new Date();
        backwardBind.setState(false)
        rightBind.setState(false)
        leftBind.setState(true)
    }
    if (getBlockZ == "-83" && cane) {
        if (new Date().getTime() - lastTurnAround.getTime() < 1000) return;
        lastTurnAround = new Date();
        backwardBind.setState(true)
        if (getBlockZ == "-74") {
            rightBind.setState(true)
        }
        leftBind.setState(false)
    }


})
// Failsafe function
register('worldLoad', () => {
    if (smacro == false) return;
    smacro = false
    click = false
    rightBind.setState(false)
    leftBind.setState(false)
    forwardBind.setState(false)
    backwardBind.setState(false)

    isReconnecting = true;

    setTimeout(() => {
        if (isInHub()) {
            ChatLib.command("is");
            ChatLib.chat("§aReconnecting to Island from Hub...");
            sneakBind.setState(true)
            setTimeout(() => {
                smacro = true
                randomshit = true
                isReconnecting = false;
            }, 5500)
        }
        else if (isInLobby()) {
            ChatLib.command("play sb");
            ChatLib.chat("§aReconnecting to SkyBlock from Lobby...");
            sneakBind.setState(true)
            setTimeout(() => {
                smacro = true
                randomshit = true
                isReconnecting = false;
            }, 5500)
        }
        else if (isInLimbo()) {
            ChatLib.command("lobby");
            ChatLib.chat("§aReconnecting to Lobby from Limbo...");
        }

    }, 4500)
});
