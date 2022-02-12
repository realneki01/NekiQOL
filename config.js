import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @DecimalSliderProperty, @SliderProperty, @CheckboxProperty, Color, @SelectorProperty } from 'Vigilance';

@Vigilant("NekoQOL")
class Settings {
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("NekoQOL Main", "Main settings for NekoQOL Module")
        this.setCategoryDescription(`Cane Macro`, "Some cane macro stuff idk")
    }

    @SwitchProperty({
        name: "S Shaped Macro Auto",
        description: "Is this macro going to activate when you connect to the server",
        category: "NekoQOL Main",
    })
    MAIN_S_FARM_AUTO_ON = false;

    @SwitchProperty({
        name: "Cane Macro Auto",
        description: "Is this macro going to activate when you connect to the server",
        category: "NekoQOL Main",
    })
    MAIN_CANE_FARM_AUTO_ON = false;

    @TextProperty({
        name: "Some fucking text",
        description: "some description idk",
        category: "NekoQOL Main",
    })

    TEXT_INPUT = " "

    @TextProperty({
        name: "Webhook URL",
        description: "If you dont put a discord one, wyd",
        category: "NekoQOL Main",
        subcategory: "Discord Related"
    })

    MAIN_WEBHOOK_URL = " "

    @TextProperty({
        name: "Discord User ID",
        description: "Set your user ID if you want to get ponged",
        category: "NekoQOL Main",
        subcategory: "Discord Related"
    })

    MAIN_WEBHOOK_DISCORD_ID = " "

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

    @TextProperty({
        name: "Z Coords #1",
        description: "if you dont know what coords are... why",
        category: "Cane Macro",
    })
    COORDS_Z_1 = " "

    @TextProperty({
        name: "Z Coords #2",
        description: "if you dont know what coords are... why",
        category: "Cane Macro",
    })
    COORDS_Z_2 = " "



}

export default new Settings;
