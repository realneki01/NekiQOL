import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @DecimalSliderProperty, @SliderProperty, @CheckboxProperty, Color, @SelectorProperty } from 'Vigilance';
@Vigilant('NekoQOL', 'NekoQOL Settings Menu', {
    getCategoryComparator: () => (a, b) => {
        // By default, categories, subcategories, and properties are sorted alphabetically.
        // You can override this behavior by returning a negative number if a should be sorted before b,
        // or a positive number if b should be sorted before a.

        // In this case, we cam put Not general! to be above general.
        const categories = ['NekoQOL Main', 'S Shaped Macro', `Cane Macro`];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Settings {
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("NekoQOL Main", "Main settings for NekoQOL Module")
        this.setCategoryDescription(`Cane Macro`, "Some cane macro stuff idk")
        this.setCategoryDescription(`S Shaped Macro`, `S Shaped Macro Settings`)
        this.setSubcategoryDescription(`S Shaped Macro`, `S Shaped Coord Settings`, `&7Set the position your player will be looking during the session`)
    }

    @SwitchProperty({
        name: "S Shaped Macro Auto",
        description: "Is this macro going to activate when you connect to the server",
        category: "S Shaped Macro",
    })
    MAIN_S_FARM_AUTO_ON = false;

    @SwitchProperty({
        name: "Cane Macro Auto",
        description: "Is this macro going to activate when you connect to the server",
        category: "Cane Macro",
    })
    MAIN_CANE_FARM_AUTO_ON = false;

    @TextProperty({
        name: "Webhook URL",
        description: "If you dont put a discord one, wyd",
        category: "NekoQOL Main",
        subcategory: "Discord Related"
    })

    MAIN_WEBHOOK_URL = ""

    @TextProperty({
        name: "Discord User ID",
        description: "Set your user ID if you want to get ponged",
        category: "NekoQOL Main",
        subcategory: "Discord Related"
    })

    MAIN_WEBHOOK_DISCORD_ID = ""

    @SwitchProperty({
        name: "Pong the webhook",
        description: "Do you want to get &lPONGED&r in discord",
        category: "NekoQOL Main",
        subcategory: "Discord Related"
    })

    MAIN_WEBHOOK_PING_TOGGLE = false;

    @SwitchProperty({
        name: "Use Webhook",
        description: "Do you want this module to send the webhook information such as changing worlds, or reconnecting?",
        category: "NekoQOL Main",
        subcategory: "Discord Related"
    })

    MAIN_WEBHOOK_TOGGLE = false;

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
        name: "Hold W Key",
        description: "Should your macro hold W whilst farming?",
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
