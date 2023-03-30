import fs from "fs";
import { parseTextWithQuotation } from "./text.js";
import { Bot } from "../src/modules/bot.js";
import { TRANSLATIONS as PT } from "./lang/pt-bt.js"
import { TRANSLATIONS as EN } from "./lang/en-us.js"

class Help {
    /**
     * 
     * @param {Bot} bot 
     */
    constructor(bot) {
        this.commandsFilename = bot.commandsFilename;
        this.botName = bot.botName;
        this.language = bot.language;
        const languages = {
            ptbr: PT,
            enus: EN
        }
        this.TRANSLATIONS = languages[this.language.replace("-", "")];
    }

    async getAllCommands() {
        const commands = fs.readFileSync(this.commandsFilename, "utf-8");
        const cases = commands.split("case").slice(1).map((cmd) => {
            return cmd.split(":")[0].replace(/"/g, '').replace(/'/g, '');
        });
    
        const document_string = `${this.botName}\n${this.TRANSLATIONS.commands}: \n-|${cases.join("\n-|")}`
        return document_string;
    }

    async getFileLines() {
        const command_file_content = fs.readFileSync(this.commandsFilename, "utf-8");
        const command_lines = (command_file_content.split("\n"));
        return command_lines;
    }

    async processCategories() {
        const command_lines = await this.getFileLines()
        let category_indexes = []
        let category_ends = []
        let last_category = undefined;
        for(let i = 0; i < command_lines.length; i++) {
            const category = command_lines[i].replace(/[^a-zA-Z0-9]/g, '').trim();
            if(command_lines[i].trim().includes("$%")) { 
                if(category.includes(last_category)) { 
                    category_ends.push(i);
                } else { 
                    category_indexes.push({
                        name: category,
                        start: i + 1,
                        end: undefined
                    });
                    last_category = category;
                }
            }
        }
        return [category_indexes, category_ends];
    }

    async getCommandsByCategory() {
        const command_lines = await this.getFileLines(this.commandsFilename);
        let category_indexes = []
        let category_ends = []
        let categories = await this.processCategories(command_lines);
        category_indexes = categories[0];
        category_ends = categories[1];
        if(category_ends.length != category_indexes.length) {
            return this.TRANSLATIONS.closingTagMissing;
        }
    
        let text = `--==${this.botName}==--\n\n${this.TRANSLATIONS.commands}:`;
        for(let i = 0; i < category_indexes.length; i++) {
            let command_text = command_lines.slice(category_indexes[i].start, category_ends[i]).join("\n").split("case").slice(1).map((cmd) => {
                // Pega apenas o comando
                return cmd.split(":")[0].replace(/"/g, '').replace(/'/g, '');
            });
    
    
            text += `\n\n${category_indexes[i].name}: \n-|` + command_text.join("\n-|");  // gera a string
            category_indexes[i].end = category_ends[i];
        }
        return text;
    }

    async getCommandComment() {
        const command_lines = await this.getFileLines(this.commandsFilename);
        let commands = {};
        let is_cmd = false;
        let cmd_name = "";
        for(let i = 0; i < command_lines.length; i++) {
            const line = command_lines[i].trim();
            if (line.startsWith("case")) {
                is_cmd = true;
                cmd_name = line.split("case")[1].split(":")[0].replace(/"/g, '').replace(/'/g, '').trim();
                commands[cmd_name] = {
                    description: "",
                };
            }
            if(is_cmd) {
                if(line.includes("// comment")) {
                    commands[cmd_name].description = parseTextWithQuotation(line.split("// comment=")[1].trim())[0];
                    is_cmd = false;
                }
            }
        }
        return commands;
    }

    async getHelp(cmd_name) {
        const comments = await this.getCommandComment();
        if(comments[cmd_name]) {
            return comments[cmd_name].description;
        }
    }
}

export default Help;
