import { realpathSync } from "fs";
import { pathToFileURL } from "url";

function wasCalledAsScript(): boolean {
    const realPath = realpathSync(process.argv[1]);
    const realPathAsUrl = pathToFileURL(realPath).href;
    return import.meta.url === realPathAsUrl;
}


export { wasCalledAsScript };