import fs from "fs/promises";

async function saveTempFile(content: Buffer | import("stream").Transform, extension: string = ""): Promise<string> {
    const randomFilename = `temp/sticker${Math.random() * 1000}${extension}`;
    await fs.writeFile(randomFilename, content);
    return randomFilename;
}

export { saveTempFile };
