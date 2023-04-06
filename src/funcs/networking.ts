import axios, { AxiosRequestConfig } from "axios";
import fs from "fs/promises";

interface RequestOptions {
    headers: { [key: string]: string };
}

const defaultHeaders = {
    "DNT": "1",
    "Upgrade-Insecure-Request": "1"
};


async function sendRequest(url: string, options: RequestOptions = { headers: defaultHeaders }): Promise<Buffer | { error: any }> {
    try {
        const response = await axios({
            url,
            responseType: "arraybuffer",
            ...options
        });
        return response.data;
    } catch (error) {
        return { error: error };
    }
}


async function saveTempFile(content: Buffer | import("stream").Transform, extension: string = ""): Promise<string> {
    const randomFilename = `temp/sticker${Math.random() * 1000}${extension}`;
    await fs.writeFile(randomFilename, content);
    return randomFilename;
}

export { sendRequest, saveTempFile };
