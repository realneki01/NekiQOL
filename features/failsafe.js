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
        } else if (isInLobby()) {
            ChatLib.command("play sb");
            ChatLib.chat("§aReconnecting to SkyBlock from Lobby...");
            sneakBind.setState(true)
            setTimeout(() => {
                smacro = true
                randomshit = true
                isReconnecting = false;
            }, 5500)
        } else if (isInLimbo()) {
            ChatLib.command("lobby");
            ChatLib.chat("§aReconnecting to Lobby from Limbo...");
        }

    }, 4500)
});