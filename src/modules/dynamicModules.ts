import { Module } from "../../@types/types.js";

export async function load(entrypoint_path: string): Promise<Module> {
    const entrypoint = await import(entrypoint_path);
    return entrypoint;
}
