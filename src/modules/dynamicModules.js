async function load(entrypoint_path) {
    const entrypoint = await import(entrypoint_path);
    return entrypoint;
}

export {
    load
};