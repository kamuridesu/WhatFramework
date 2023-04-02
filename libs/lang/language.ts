import { Bot } from "src/types/bot.js";
import Translations from "./interface.js";
import { TRANSLATIONS as ptbr } from "./pt-bt.js";
import { TRANSLATIONS as enus } from "./en-us.js";

class Language {
    readonly language: string;
    readonly TRANSLATIONS: Translations;

    constructor(bot: Bot) {
        this.language = bot.language;
        const languages = {
            ptbr: ptbr,
            enus: enus,
        };
        this.TRANSLATIONS = languages[this.language.replace("-", "")];
    }
}

export default Language;