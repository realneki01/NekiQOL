import SettingsNew from "../config";
import request from "requestV2";
const webhookURL = SettingsNew.MAIN_WEBHOOK_URL

function postWebhook(url, data) {
    data = getPingWebhook(data)
    request({
        url: url,
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