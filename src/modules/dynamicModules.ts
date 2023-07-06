import { Module } from "src/types/bot.js";

async function load(entrypoint_path: string): Promise<Module> {
    const entrypoint = await import(entrypoint_path);
    return entrypoint;
}

export {
    load
};
