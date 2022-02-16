import SettingsNew from "../config";


register("chat", function(event) {
    var msgString = ChatLib.removeFormatting(ChatLib.getChatMessage(event))
    
    let msgLC = msgString.toLowerCase()
    let partss = msgLC.split(" ")
    for (let i = 0; i < key.keywords.length; i++) {
        if (partss.includes(key.keywords[i]) || msgLC.includes(key.keywords[i])) {
            if(SettingsNew.MYFILTER_TOGGLE){
                
                if(SettingsNew.MYFILTER_IGNORE_GUILD_CHAT){
                    if(msgString.startsWith(`Guild >`)){
                        return;
                    }
                }
                if(SettingsNew.MYFILTER_IGNORE_PARTY_CHAT){
                    if(msgString.startsWith(`Party >`)){
                        return;
                    }
                }
    
                if(SettingsNew.MYFILTER_IGNORE_PRIVATE_CHAT){
                    if(msgString.startsWith(`From`) || msgString.startsWith(`To`)){
                        return;
                    }
                }
    
                if(SettingsNew.MYFILTER_IGNORE_OFFICER_CHAT){
                    if(msgString.startsWith(`Officer >`)){
                        return;
                    }
                }
    
                cancel(event)
                if(SettingsNew.MYFILTER_NOTIFICATIONS){
                    if(msgString.startsWith(`Guild >`)){
                        if(!SettingsNew.MYFILTER_IGNORE_GUILD_CHAT){
                            if(SettingsNew.FUN_NEKO_MODE){
                                var chat = new TextComponent("&2Guild > &b[BOT] Weebchan&f: &f&oNyi removed nya bad mewnssage ;3").setHoverValue(msgCont)
                                ChatLib.chat(chat)
                            } else {
                                var chat = new TextComponent("&2Guild > &b[BOT] Weebchan&f: &f&oRemoved a blocked term").setHoverValue(msgCont)
                                ChatLib.chat(chat)
                            }
                        }
                    } else if(msgString.startsWith(`Party >`)){
                        if(SettingsNew.FUN_NEKO_MODE){
                            var chat = new TextComponent("&9Party > > &b[BOT] Weebchan&f: &f&oNyi removed nya bad mewnssage ;3").setHoverValue(msgCont)
                            ChatLib.chat(chat)
                        } else {
                            var chat = new TextComponent("&9Party > &b[BOT] Weebchan&f: &f&oRemoved a blocked term").setHoverValue(msgCont)
                            ChatLib.chat(chat)
                        }
                    } else if(msgString.startsWith(`Officer >`)){
                        if(!SettingsNew.MYFILTER_IGNORE_OFFICER_CHAT){
                            if(SettingsNew.FUN_NEKO_MODE){
                                var chat = new TextComponent("&3Officer > &b[BOT] Weebchan&f: &f&oNyi removed nya bad mewnssage ;3").setHoverValue(msgCont)
                                ChatLib.chat(chat)
                            } else {
                                var chat = new TextComponent("&3Officer > &b[BOT] Weebchan&f: &f&oRemoved a blocked term").setHoverValue(msgCont)
                                ChatLib.chat(chat)
                            }
                        }
                    } else if(msgString.startsWith(`From`) || msgString.startsWith(`To`)){
                            if(!SettingsNew.MYFILTER_IGNORE_PRIVATE_CHAT){
                                if(SettingsNew.FUN_NEKO_MODE){
                                    var chat = new TextComponent("&bPrivate MSG > &b[BOT] Weebchan&f: &f&oNyi removed nya bad mewnssage ;3").setHoverValue(msgCont)
                                ChatLib.chat(chat)
                                } else {
                                    var chat = new TextComponent("&bPrivate MSG > &b[BOT] Weebchan&f: &f&oRemoved a blocked term").setHoverValue(msgCont)
                                    ChatLib.chat(chat)
                                }
                            }
                    } else {
                        if(SettingsNew.FUN_NEKO_MODE){
                            var chat = new TextComponent("&b[BOT] Weebchan&f: &f&oNyi removed nya bad mewnssage ;3").setHoverValue(msgCont)
                            ChatLib.chat(chat)
                        } else {
                            var chat = new TextComponent("&b[BOT] Weebchan&f: &f&oRemoved a blocked term").setHoverValue(msgCont)
                            ChatLib.chat(chat)
                        }
                    }
                }
            }
        }
    }
    if(SettingsNew.MYFILTER_DUNGEONS_SALVAGE_ITEM){
        if(msgString.startsWith(`You salvaged a`) && msgString.includes(`Essence!`)){
            cancel(event)
        }
    }
    if(SettingsNew.MYFILTER_REFORGE_ITEM){
        if(msgString.startsWith(`You reforged your`) && msgString.includes(`into a`)){
            cancel(event)
        }
    }
    if(SettingsNew.MYFILTER_RANDOMIZE_SERVER_NAME){
        if(msgString.startsWith(`Request join for Hub #`)){
            cancel(event)
            ChatLib.chat(`&f[&bHIDDEN&f] &fRequest join for Hub &b#?? &f(&b????&f)`)
        }
        if(msgString.startsWith(`Sending to server`) && msgString.includes(`...`)){
            cancel(event)
            ChatLib.chat(`&f[&bHIDDEN&f] &fSending you to server &b????`)
        }
    }


    if(SettingsNew.MYFILTER_GEXP_EARNED){
        if(msgString.startsWith(`You earned`) && msgString.includes(`from playing SkyBlock!`)){
            cancel(event)
        }
    }

    if(SettingsNew.MYFILTER_TIPPED_PLAYER){
        if(msgString.startsWith(`You tipped`) && msgString.includes(`in`)){
            cancel(event)
        }
        if(msgString.startsWith(`You were tipped by`) && msgString.includes(`in the last minute!`)){
            cancel(event)
        }
    }


    if(SettingsNew.MYFILTER_HYPIXEL_BROADCAST_TOGGLE){
        // PLAYER INFORMATION
        if(msgString.startsWith(`[PLAYER INFORMATION]`)){
            cancel(event)
        }
        if(msgString.startsWith(`Have a question? Our help menu may have your answer!`)){
            cancel(event)
        }
        if(msgString.startsWith(`Type /help and look through our many helpful links.`)){
            cancel(event)
        }

        // REPORT
        if(msgString.startsWith(`Found a rule breaker? Our`)){
            cancel(event)
        }
        if(msgString.startsWith(`Type /report <name> and follow`)){
            cancel(event)
        }

        // WATCHDOG
        if(msgString.startsWith(`[WATCHDOG ANNOUNCEMENT]`)){
            cancel(event)
        }
        if(msgString.startsWith(`Watchdog has banned`)){
            cancel(event)
        }
        if(msgString.startsWith(`Staff have banned an additional`)){
            cancel(event)
        }
        if(msgString.startsWith(`Blacklisted modifications are a bannable offense!`)){
            cancel(event)
        }
    }
});