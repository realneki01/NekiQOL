/// <reference types="../ctautocomplete" />
/// <reference lib="es2015" />
import request from "requestV2";
import Settings from "./config";
import { KeyLib } from "../KeyLib/index";
const CaneMacrokeyBind = new KeyBind("Toggle Cane macro", Keyboard.KEY_NONE, "NekiQOL");
const AnglekeyBind = new KeyBind("Look Farming Direction", Keyboard.KEY_NONE, "NekiQOL");
const CollectorBind = new KeyBind("Auto Collect F Sack", Keyboard.KEY_NONE, "NekiQOL");
const sendClickBlockToController = Client.getMinecraft().getClass().getDeclaredMethod("func_147115_a", java.lang.Boolean.TYPE);
sendClickBlockToController.setAccessible(true);
let prefix = "&l&0[&5Neki&4QOL&0]"
let caneMacro = false;
let lastTurnAround = new Date();
const mc = Client.getMinecraft();
const LeftClick = new KeyBind(mc.field_71474_y.field_74312_F);
const forwardBind = new KeyBind(mc.field_71474_y.field_74351_w);
const backwardBind = new KeyBind(mc.field_71474_y.field_74368_y);
const leftBind = new KeyBind(mc.field_71474_y.field_74370_x);
const rightBind = new KeyBind(mc.field_71474_y.field_74366_z);
const sneakBind = new KeyBind(mc.field_71474_y.field_74311_E);
let direction = "forwards";
let num = 0;
let Display = new Display();
Display.setBackground("per line");
Display.setRenderLoc(800, 150);
let meow = new Date();
let egg = new Date();

// let MacroCoords1 = -143;
// let MacroCoords2 = 143;

let MacroCoords1 = Settings.FIRST_COORD;
let MacroCoords2 = Settings.SECOND_COORD;

register("command", function() {
    Settings.openGUI();
}).setName("nekiqol");

function sendDiscordMessage(data) {
    let url = Settings.MAIN_WEBHOOK_URL;
    let content = data

    request({
        url: url,
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            "User-Agent": "Mozilla/5.0"
        },
        body: {
            username: "NekiQOL Alerts",
            content: content,
            avatar_url: "https://media.discordapp.net/attachments/1085981221366005772/1086034599920029848/sugarcane.webp"
        }
    });
}

register("chat", function (event) {
    let msgString = ChatLib.removeFormatting(ChatLib.getChatMessage(event));
    if (msgString.startsWith("[Important] This server will")) {
        sendDiscordMessage("DETECTED SERVER REBOOT");
        ChatLib.chat("&fDetected &cServer Reboot&f... ");

        setTimeout(() => {
            ChatLib.say("/sethome");
            ChatLib.say("/hub");
        }, 3000);

        setTimeout(() => {
            ChatLib.say("/warp garden");
        }, 16000);

        setTimeout(() => {
            sneakBind.setState(true);

            setTimeout(() => {
                sneakBind.setState(false);
            }, 1000);

        }, 18000);
        sendDiscordMessage("CONTINUING TO FARM");
    }
});


register("tick", () => {

    Display.setLine(
        0,
        Math.floor(Player.getX()) + "&7x &r"
        + Math.floor(Player.getY()) + "&7y &r"
        + Math.floor(Player.getZ()) + "&7z &r"
    );

    if (AnglekeyBind.isPressed()) {
        Player.getPlayer().field_70177_z = 45 //PITCH
        Player.getPlayer().field_70125_A = 0.0 //YAW
    }

    if (num == 1 && caneMacro) {
        console.log("lol");
        num = 0;
        if (direction == "forwards") {
            leftBind.setState(true);
        }
        else if (direction == "backwards") {
            backwardBind.setState(true);
        }
    }

    if (caneMacro) { 
        if (Client.currentGui.get()) {  // check if GUI opened
            caneMacro = false;
            num = 1;
            ChatLib.chat(`${prefix} &aCane Macro&f has been toggled &c&lOFF&f!`);
            LeftClick.setState(false);
            rightBind.setState(false);
            leftBind.setState(false);
            forwardBind.setState(false);
            backwardBind.setState(false);
            return;
        };
    }

    getBlockX = Math.round(Player.getX());
    getBlockY = Math.round(Player.getY());
    getBlockZ = Math.round(Player.getZ());

    if (CollectorBind.isPressed()) {
        if (new Date().getTime() - meow.getTime() < 2000) return;
        let prevSlot = Player.getHeldItemIndex();
        Player.setHeldItemIndex(3);
        KeyLib.rightClick();
        Player.setHeldItemIndex(prevSlot);
    }

    if (Player.getContainer().getName().includes("Enchanted Agronomy Sack")) {
        let itemlore = Player?.getOpenedInventory()?.getStackInSlot(25)?.getLore() || null 
        if (itemlore==null) return;
        if (itemlore.includes("§5§o§7Stored: §80§7")) {
            if (new Date().getTime() - egg.getTime() < Math.floor(Math.random() * (5000 - 6000 + 1) + 6000)) return;
            Player.getOpenedInventory().click(32, false, "LEFT");
        }
    } 

    // Cane macro toggle
    if (CaneMacrokeyBind.isPressed()) {
        if (caneMacro == false) {
            Client.getMaxMemory();
            caneMacro = true;
            ChatLib.chat(`${prefix} &aCane Macro&f has been toggled &a&lON&f!`);
            LeftClick.setState(true);
        }
        else if (caneMacro == true) {
            caneMacro = false;
            num = 1;
            ChatLib.chat(`${prefix} &aCane Macro&f has been toggled &c&lOFF&f!`);
            LeftClick.setState(false);
            rightBind.setState(false);
            leftBind.setState(false);
            forwardBind.setState(false);
            backwardBind.setState(false);
        }
    }


    if (getBlockZ == MacroCoords1 && caneMacro) {   // if current coords equal the preset coords, go backwards
        if (new Date().getTime() - lastTurnAround.getTime() < 1000) return;
        lastTurnAround = new Date();
        setTimeout(() => {
            backwardBind.setState(false);
        }, 200);
        leftBind.setState(true);
        direction = "forwards";
        sendDiscordMessage("Going Forwards!");
    }


    if (getBlockZ == MacroCoords2 && caneMacro) {   // if current coords equal the preset coords, go backwards
        if (new Date().getTime() - lastTurnAround.getTime() < 1000) return;
        lastTurnAround = new Date();
        setTimeout(() => {
            leftBind.setState(false);   // stop W keypress
        }, 200);
        backwardBind.setState(true);    // start S keypress
        direction = "backwards"
        sendDiscordMessage("Going Backwards!");
    }
});

