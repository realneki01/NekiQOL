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
}
export default new Settings;

