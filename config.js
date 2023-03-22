import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, @DecimalSliderProperty, @SliderProperty, @CheckboxProperty, Color, @SelectorProperty, @PercentSliderProperty } from 'Vigilance';
@Vigilant('NekiQOL', 'NekiQOL Settings', {
    getCategoryComparator: () => (a, b) => {
        const categories = ['NekiQOL Settings'];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
})
class Settings {
    constructor() {
        this.initialize(this);
    }

    @TextProperty({
        name: "Webhook URL",
        description: "If you dont put a discord one, wyd",
        category: "Webhook Settings",
        subcategory: "Discord Related"
    })

    MAIN_WEBHOOK_URL = ""

    @TextProperty({
        name: 'First Coord',
        description: "&c&lFirst Macro Coordinate",
        category: 'Macro',
        subcategory: 'Macro Settings',
    })
    FIRST_COORD = -143;

    @TextProperty({
        name: 'Second Coord',
        description: "&c&lSecond Macro Coordinate",
        category: 'Macro',
        subcategory: 'Macro Settings',
    })
    SECOND_COORD = 143;

    @TextProperty({
        name: 'Viewing Pitch Keybind',
        description: "&c&lChange Pitch",
        category: 'Macro',
        subcategory: 'Viewing Angle',
    })
    VIEWING_PITCH = 45;

    @TextProperty({
        name: 'Viewing Yaw Keybind',
        description: "&c&lChange Yaw",
        category: 'Macro',
        subcategory: 'Viewing Yaw',
    })
    VIEWING_PITCH = 0;
}
export default new Settings;

