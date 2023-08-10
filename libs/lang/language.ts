import { Bot } from "src/interfaces/types.js";
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
    public readonly language: string;
    private readonly TRANSLATIONS: Translations;

    constructor(bot: Bot) {
        this.language = bot.language;
        this.TRANSLATIONS = languages[this.language.replace("-", "")];
    }

    public get(): Translations {
        return this.TRANSLATIONS;
    }
}

export { Language };