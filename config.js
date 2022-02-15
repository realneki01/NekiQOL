import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @DecimalSliderProperty, @SliderProperty, @CheckboxProperty, Color, @SelectorProperty } from 'Vigilance';
@Vigilant('NekoQOL', 'NekoQOL Settings Menu', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['NekoQOL Main', 'S Shaped Macro', `Cane Macro`];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getPropertyComparator: () => (a, b) => {
        const names = ["Use Webhook","S Macro Ping","Cane Macro Ping", "Discord User ID", "Webhook URL", "Pong the webhook"];

        return names.indexOf(a.attributes.name) -
            names.indexOf(b.attributes.name);
    }
})
class Settings {
    constructor() {
        this.initialize(this);
        this.addDependency("Webhook URL", "Use Webhook")
        this.addDependency("Discord User ID", "Use Webhook")
        this.addDependency("Pong the webhook", "Use Webhook")
        this.addDependency("S Macro Ping", "Use Webhook")
        this.addDependency("Cane Macro Ping", "Use Webhook")
        this.setCategoryDescription("NekoQOL Main", "Main settings for NekoQOL Module")
        this.setCategoryDescription(`Cane Macro`, "Some cane macro stuff idk")
        this.setCategoryDescription(`S Shaped Macro`, `S Shaped Macro Settings`)
        this.setSubcategoryDescription(`S Shaped Macro`, `S Shaped Coord Settings`, `&7Set the position your player will be looking during the session`)
    }
//Ignore the fuck up this causes if u toggle "use webhook" on and off, its a vigilance bug, i reported it alrdy
    @SwitchProperty({
        name: "S Shaped Macro Auto",
        description: "Is this macro going to activate when you connect to the server\n&cTurn this setting off if you are playing normally!",
        category: "S Shaped Macro",
    })
    S_FARM_AUTO_ON = false;

    @SwitchProperty({
        name: "Cane Macro Auto",
        description: "Is this macro going to activate when you connect to the server",
        category: "Cane Macro",
    })
    CANE_FARM_AUTO_ON = false;

    @TextProperty({
        name: "Webhook URL",
        description: "If you dont put a discord one, wyd",
        category: "Webhook Settings",
        subcategory: "Discord Related"
    })

    MAIN_WEBHOOK_URL = ""

    @TextProperty({
        name: "Discord User ID",
        description: "Set your user ID if you want to get ponged",
        category: "Webhook Settings",
        subcategory: "Discord Related"
    })

    MAIN_WEBHOOK_DISCORD_ID = ""

    @SwitchProperty({
        name: "Pong the webhook",
        description: "Do you want to get &lPONGED&r in discord",
        category: "Webhook Settings",
        subcategory: "Discord Related"
    })

    MAIN_WEBHOOK_PING_TOGGLE = false;

    @SwitchProperty({
        name: "Use Webhook",
        description: "Do you want this module to send the webhook information, such as changing worlds, or reconnecting?",
        category: "Webhook Settings",
    })

    MAIN_WEBHOOK_TOGGLE = false;

    @SwitchProperty({
        name: "S Macro Ping",
        description: "Do you want pings on S Macro webhooks, for changing worlds, or reconnecting?",
        category: "Webhook Settings",
        subcategory: "Discord Related"
    })

    MAIN_S_PING_TOGGLE = false;

    @SwitchProperty({
        name: "Cane Macro Ping",
        description: "Do you want pings on Cane Macro webhooks, for changing worlds, or reconnecting?",
        category: "Webhook Settings",
        subcategory: "Discord Related"
    })

    MAIN_CANE_PING_TOGGLE = false;

    // CANE MACRO SETTINGS

    @TextProperty({
        name: "Z Coords #1",
        description: "if you dont know what coords are... why",
        category: "Cane Macro",
    })
    CANE_COORDS_Z_1 = ""

    @TextProperty({
        name: "Z Coords #2",
        description: "if you dont know what coords are... why",
        category: "Cane Macro",
    })
    CANE_COORDS_Z_2 = ""

    // S SHAPED MACRO SETTINGS

    @SwitchProperty({
        name: "Hold W",
        description: "Doing Something",
        category: "S Shaped Macro",
    })

    S_SHAPED_HOLD_W = false;

    @TextProperty({
        name: "Pitch",
        description: "What direction will the macro be facing when farming?",
        category: "S Shaped Macro",
        subcategory: "S Shaped Coord Settings",
        placeholder: "90.0"
    })
    S_SHAPED_COORDS_PITCH = ""

    @TextProperty({
        name: "Yaw",
        description: "&c&lWARNING: &cSetting it past -90 to 90 will result in an instant watchdog ban!",
        category: "S Shaped Macro",
        subcategory: "S Shaped Coord Settings",
        placeholder: "0.0"
    })
    S_SHAPED_COORDS_YAW = ""




}

export default new Settings;
