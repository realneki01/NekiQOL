import SettingsNew from "../config";
import request from "requestV2";
const CobbleMacroBind = new KeyBind("Toggle Cobble macro", Keyboard.KEY_NONE, "NekoQOL")
const SMacroBind = new KeyBind("Toggle S Farm macro", Keyboard.KEY_NONE, "NekoQOL")
const CaneMacrokeyBind = new KeyBind("Toggle Cane macro", Keyboard.KEY_NONE, "NekoQOL")
const sendClickBlockToController = Client.getMinecraft().getClass().getDeclaredMethod("func_147115_a", java.lang.Boolean.TYPE);
sendClickBlockToController.setAccessible(true);


let prefix = "&8[&b&lNeko&7&lQOL&8]"
    // Specified keybinds, pretty self explanitory
const mc = Client.getMinecraft();
const forwardBind = new KeyBind(mc.field_71474_y.field_74351_w);
const backwardBind = new KeyBind(mc.field_71474_y.field_74368_y);
const leftBind = new KeyBind(mc.field_71474_y.field_74370_x);
const rightBind = new KeyBind(mc.field_71474_y.field_74366_z);
const sneakBind = new KeyBind(mc.field_71474_y.field_74311_E);
// Veriables, in case you want to add macros
let getBlock
let lastY
let click = false
let cane = false;
let cobble = false;
let smacro = false;
let lastTurnAround = new Date();
let isReconnecting = false
let randomshit = false
let lastdir = 1

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
register(`command`, (...args) => {
    let testMsg = args.slice(1).join(" ")
    let msg = `This is some nice text **NYAA!**`
    if(args == "setState"){
        ChatLib.chat(`Attempting to set the state of S MACRO`)
        SMacroBind.setState(true)
    }
    if(args == ""){
        ChatLib.chat(ChatLib.getChatBreak(`&b====================================================`))
        ChatLib.chat(ChatLib.getCenteredText(`&b&lNeko&7&lQOL &7DEV COMMANDS`))
        ChatLib.chat(ChatLib.getCenteredText(`&7Module Developed by &bAzael&7 & &bSemiMute`))
        ChatLib.chat(`&c`)
        ChatLib.chat(`&7- &b/nekoqol setState &9- &7&oSet the state of SMacro to true`)
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
}).setName(`nekoqoldev`)

register("tick", () => {
    lastY = getBlock
    getBlock = Player.getY()
    const item = Player.getHeldItem();
    getBlockZ = Math.round(Player.getZ())
    getBlockX = Math.round(Player.getX())
    // This is to turn off all defined macros, if you add any macro on your own add it to here, so it turns off in case you open a menu

    if (Client.currentGui.get() !== null) {
        if (cobble) {
            ChatLib.chat(`${prefix} &aAll Macros&f have been toggled &c&lOFF&f!`)
            ChatLib.chat(`&7Detected player opening a GUI menu, force quitting all macros`)

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
            ChatLib.chat(`${prefix} &aAll Macros&f have been toggled &c&lOFF&f!`)
            ChatLib.chat(`&7Detected player opening a GUI menu, force quitting all macros`)

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
            ChatLib.chat(`${prefix} &aAll Macros&f have been toggled &c&lOFF&f!`)
            ChatLib.chat(`&7Detected player opening a GUI menu, force quitting all macros`)

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
        if (isInIsland() == false){
            ChatLib.chat(`${prefix} &cCobble Macro&f cannot be started outside your island!`)
            return
        }
        if (cobble == false) {
            cobble = true
            ChatLib.chat(`${prefix} &7Cobble Macro&f has been toggled &a&lON&f!`)
            click = true
        }
        else if (cobble == true) {
            cobble = false
            ChatLib.chat(`${prefix} &7Cobble Macro&f has been toggled &c&lOFF&f!`)
            click = false
            forwardBind.setState(false)
        }
    }
    
    // S Macro toggle
    if (SMacroBind.isPressed()) {
        if (isInIsland() == false){
            ChatLib.chat(`${prefix} &cS Shaped Macro&f cannot be started outside your island!`)
            return
        }
        if (smacro == false) {
            smacro = true
            ChatLib.chat(`${prefix} &aS Shaped Macro&f has been toggled &a&lON&f!`)
            Player.getPlayer().field_70177_z = SettingsNew.S_SHAPED_COORDS_PITCH || 90
            Player.getPlayer().field_70125_A = SettingsNew.S_SHAPED_COORDS_YAW || 0.0
            click = true
            if(lastdir == 1){
                rightBind.setState(true)
            }
            else if(lastdir == 2){
                leftBind.setState(true)
            }
            else{
                rightBind.setState(true)
            }
            if(SettingsNew.S_SHAPED_HOLD_W){
                forwardBind.setState(true)
            }
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
                lastdir = 2
                rightBind.setState(false);
                leftBind.setState(true);
                setTimeout(() => {
                    ChatLib.say(`/sethome`)
                }, 1000);
            }
            else if (leftBind.isKeyDown()) {
                lastdir = 1
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
                lastdir = 2
                rightBind.setState(false);
                leftBind.setState(true);
            }
            else if (leftBind.isKeyDown()) {
                lastdir = 1
                leftBind.setState(false);
                rightBind.setState(true);
            }
        }
        if (isReconnecting == false && randomshit == true) {
            click = true
            sneakBind.setState(false)
            leftBind.setState(false);
            rightBind.setState(true);
            Player.getPlayer().field_70177_z = SettingsNew.S_SHAPED_COORDS_PITCH || 90.0
            Player.getPlayer().field_70125_A = SettingsNew.S_SHAPED_COORDS_YAW || 0.0
            randomshit = false
        }
    }
    if (click == true) {
        sendClickBlockToController.invoke(Client.getMinecraft(), true);
    }
    // Cane macro toggle
    if (CaneMacrokeyBind.isPressed()) {
        if (isInIsland() == false){
            ChatLib.chat(`${prefix} &cCane Macro&f cannot be started outside your island!`)
            return
        }
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


// failsafe
// Island checks
let reboot;

const isRestart = () => {
}
const isInHub = () => {
    return Scoreboard.getLines().find(l => l.toString().includes("Village")) !== undefined;
}

const isInIsland = () => {
    return Scoreboard.getLines().find(l => l.toString().includes("Your Isla")) !== undefined;
}

const isInLobby = () => {
    let i = Player.getInventory().getStackInSlot(0);
    let i2 = Player.getInventory().getStackInSlot(4);
    if (i === null || i2 === null) return false;
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

let ReconnectMode;
function START_S_MACRO(){
    smacro = true
    ChatLib.chat(`${prefix} &aS Shaped Macro&f has been toggled &a&lON&f!`)
    Player.getPlayer().field_70177_z = SettingsNew.S_SHAPED_COORDS_PITCH || 90
    Player.getPlayer().field_70125_A = SettingsNew.S_SHAPED_COORDS_YAW || 0.0
    click = true
    rightBind.setState(true)
    if(SettingsNew.S_SHAPED_HOLD_W){
        forwardBind.setState(true)
    }
    ReconnectMode = false
}
function KILL_S_MACRO(){
    ChatLib.chat(`${prefix} &aS Shaped Macro&f has been toggled &c&lOFF&f!`)
    rightBind.setState(false)
    forwardBind.setState(false)
    click = false
    leftBind.setState(false)
    smacro = false
}
register("chat", function(event) {
    var msgString = ChatLib.removeFormatting(ChatLib.getChatMessage(event))
    if(msgString.startsWith(`[Important] This server will`) && smacro == true){
        KILL_S_MACRO()
        reboot = true
        ChatLib.chat(`${prefix} &fDetected &cServer Reboot&f... Forcing S Shaped as &c&lOFF&f!\n&7Attempting to warp client back to island in 90 Seconds`)
        setTimeout(() => {
            ChatLib.say(`/warp home`)
        }, 120000);
        setTimeout(() => {
            START_S_MACRO()
        }, 140000);
    }
    // FAIL SAFE SERVER WARPING
    if(msgString.includes(`"map":"Hub"` && reboot !== true) && smacro == true){
        KILL_S_MACRO()
        ChatLib.chat(`${prefix} &7[FAILSAFE] &fAttempting to warp client to &aPrivate Island &fin &c120 Seconds&f!`)
        setTimeout(() => {
            ChatLib.say(`/warp home`)
        }, 120000);
        setTimeout(() => {
            START_S_MACRO()
        }, 140000);
    }
    if(SettingsNew.S_FARM_AUTO_ON){
        if(msgString.includes(`"gametype":"MAIN"`) || msgString.includes(`"gametype":"PROTOTYPE"`)){
            ReconnectMode = true
            ChatLib.chat(`${prefix} &7[FAILSAFE] &fAttempting to warp client to gamemode &bSkyblock&f.`)
            ChatLib.command(`play sb`)
        }
    }
    if(msgString.includes(`"map":"Hub"`) && ReconnectMode == true){
        KILL_S_MACRO()
        ChatLib.chat(`${prefix} &7[FAILSAFE] &fAttempting to warp client to &aPrivate Island&f.`)
        setTimeout(() => {
            ChatLib.command(`warp home`)
        }, 60000);
    }
    if(ReconnectMode == true){
        if(msgString.includes(`"map":"Private Island"`)){
            ChatLib.chat(`${prefix} &7[FAILSAFE] &fDetected client joining &aPrivate Island&f.`)
            sneakBind.setState(true)
            setTimeout(() => {
                sneakBind.setState(false)
            }, 1000);
            setTimeout(() => {
                ChatLib.chat(`${prefix} &cForcing S Shaped Macro to state &a&lON&c due to Auto Reconnect`)
                smacro = true
                ChatLib.chat(`${prefix} &aS Shaped Macro&f has been toggled &a&lON&f!`)
                postWebhook(`Forcing client S Shaped to state **ON** due to a reconnect sequence`)
                Player.getPlayer().field_70177_z = SettingsNew.S_SHAPED_COORDS_PITCH || 90
                Player.getPlayer().field_70125_A = SettingsNew.S_SHAPED_COORDS_YAW || 0.0
                click = true
                rightBind.setState(true)
                if(SettingsNew.S_SHAPED_HOLD_W){
                    forwardBind.setState(true)
                }
                ReconnectMode = false
            }, 5000);
        }
    }
}),

register('worldLoad', () => {
    // AUTO RECONNECT SYSTEM
    if(SettingsNew.S_FARM_AUTO_ON && smacro){
        if(isInLobby()){
            ChatLib.chat(`${prefix} &4&lDEBUGGER: &7Detected player in Lobby with setting &cS Shaped Auto Start&7 as &a&lON&7!\n&7Attempting to warp player to gamemode SKYBLOCK`)
            ReconnectMode = true
            ChatLib.command(`play sb`)
            setTimeout(() => {
                
            }, 2000);
            if(isInHub()){
                ChatLib.chat(`${prefix} &4&lDEBUGGER: &7Detected player in Hub with setting &cS Shaped Auto Start&7 as &a&lON&7!\n&7Attempting to warp player to PRIVATE ISLAND`)
                ChatLib.command(`warp home`)
            }
        }
    }
    if (smacro == true && SettingsNew.MAIN_S_PING_TOGGLE){
        postWebhook("S Macro detected a world change.")
        smacro = false
        click = false
        rightBind.setState(false)
        leftBind.setState(false)
        forwardBind.setState(false)
        backwardBind.setState(false)
    }
    if (smacro == true) {
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
                postWebhook(`Detected World Change: Correcting player position from **HUB** to **PLAYER ISLAND**`)
                if (!Player.getPlayer().isOnGround()) {
                    sneakBind.setState(true)
                }
                setTimeout(() => {
                    smacro = true
                    randomshit = true
                    isReconnecting = false;
                }, 5500)
            } else if (isInLobby()) {
                if(SettingsNew.S_FARM_AUTO_ON){

                }
                ChatLib.command("play sb");
                ChatLib.chat("§aReconnecting to SkyBlock from Lobby...");
                postWebhook(`Detected World Change: Correcting player position from **LOBBY** to **GAMEMODE: SKYBLOCK**`)
                if (!Player.getPlayer().isOnGround()) {
                    sneakBind.setState(true)
                }
                setTimeout(() => {
                    smacro = true
                    randomshit = true
                    isReconnecting = false;
                }, 5500)
            } else if (isInLimbo()) {
                ChatLib.command("lobby");
                ChatLib.chat("§aReconnecting to Lobby from Limbo...");
                postWebhook(`Detected World Change: Correcting player position from **LIMBO** to **LOBBY**`)
            } else if(isInIsland){

            }

        }, 4500)
    }
});
export{prefix}