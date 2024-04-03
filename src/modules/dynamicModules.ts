import { Module } from "../../@types/types.js";

export async function load(entrypointPath: string): Promise<Module> {
    const entrypoint = await import(entrypointPath);
    return entrypoint;
}
