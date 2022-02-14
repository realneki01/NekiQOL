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
        if (smacro == false) {
            smacro = true
            ChatLib.chat(`${prefix} &aS Shaped Macro&f has been toggled &a&lON&f!`)
            Player.getPlayer().field_70177_z = SettingsNew.S_SHAPED_COORDS_PITCH || 90
            Player.getPlayer().field_70125_A = SettingsNew.S_SHAPED_COORDS_YAW || 0.0
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
        Player.getPlayer().field_70177_z = SettingsNew.S_SHAPED_COORDS_PITCH || 90.0
        Player.getPlayer().field_70125_A = SettingsNew.S_SHAPED_COORDS_YAW || 0.0
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
const isInHub = () => {
    return Scoreboard.getLines().find(l => l.toString().includes("Village")) !== undefined;
}

const isInIsland = () => {
    return Scoreboard.getLines().find(l => l.toString().includes("Your island")) !== undefined;
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
register('worldLoad', () => {
    if (smacro == true && SettingsNew.MAIN_S_PING_TOGGLE){
        postWebhook("S Macro detected a world change.")
        smacro = false
        click = false
        rightBind.setState(false)
        leftBind.setState(false)
        forwardBind.setState(false)
        backwardBind.setState(false)
    }
    if (smacro == true && SettingsNew.S_FARM_AUTO_ON) {
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
            }

        }, 4500)
    }
});
export{prefix}