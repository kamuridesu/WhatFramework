interface Module {
    Entrypoint: any
}

/**
 * Loads and returns the entrypoint module from the specified path. 
 * @param {string} entrypoint_path - The path of the entrypoint module.
 * @returns {Promise<Object>} - A Promise that resolves with the entrypoint module.
 */
async function load(entrypoint_path: string): Promise<Module> {
    const entrypoint = await import(entrypoint_path);
    return entrypoint;
}

export {
    load
};
