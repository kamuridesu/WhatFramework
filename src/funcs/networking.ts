import axios, { AxiosRequestConfig } from "axios";
import fs from "fs/promises";

interface RequestOptions {
  headers: { [key: string]: string };
  // other options...
}

const defaultHeaders = {
  "DNT": "1",
  "Upgrade-Insecure-Request": "1"
};

/**
 * Send a HTTP request to the given URL
 * @param {string} url - The URL to send the request to
 * @param {RequestOptions} [options] - Optional request options
 * @returns {Promise<Buffer>} - A promise that resolves with the response content as a buffer
 */
async function sendRequest(url: string, options: RequestOptions = {headers: defaultHeaders}): Promise<Buffer | { error: any }> {
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

/**
 * Save the given content to a temporary file and return the file path
 * @param {Buffer} content - The content to save to file
 * @param {string} [extension] - Optional file extension
 * @returns {Promise<string>} - A promise that resolves with the path to the saved file
 */
async function saveTempFile(content: Buffer | import("stream").Transform, extension: string = ""): Promise<string> {
  const randomFilename = `temp/sticker${Math.random() * 1000}${extension}`;
  await fs.writeFile(randomFilename, content);
  return randomFilename;
}

export { sendRequest, saveTempFile };
