import { Bot } from "src/types/bot.js";
import Translations from "./interface.js";
import { TRANSLATIONS as ptbr } from "./pt-bt.js";
import { TRANSLATIONS as enus } from "./en-us.js";

interface LanguageMap {
    [key: string]: Translations;
}

const languages: LanguageMap = {
    ptbr: ptbr,
    enus: enus,
};


class Language {
    readonly language: string;
    readonly TRANSLATIONS: Translations;

    constructor(bot: Bot) {
        this.language = bot.language;
        this.TRANSLATIONS = languages[this.language.replace("-", "")];
    }
}

export default Language;