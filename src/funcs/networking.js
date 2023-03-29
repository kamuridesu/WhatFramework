import axios from "axios";
import fs from "fs/promises";

/**
 * Send a HTTP request to the given URL
 * @param {string} url - The URL to send the request to
 * @param {Object} [config] - Optional request configuration options
 * @returns {Promise<Buffer>} - A promise that resolves with the response content as a buffer
 */
async function sendRequest(url, config = {}) {
  const defaultHeaders = {
    "DNT": 1,
    "Upgrade-Insecure-Request": 1
  };

  try {
    const response = await axios({
      url,
      headers: { ...defaultHeaders, ...config.headers },
      responseType: "arraybuffer",
      ...config
    });
    return response.data;
  } catch (error) {
    const errorImage = await fs.readFile("./media/errorImage.jpeg");
    return { media: errorImage, error };
  }
}

/**
 * Save the given content to a temporary file and return the file path
 * @param {Buffer} content - The content to save to file
 * @param {string} [extension] - Optional file extension
 * @returns {Promise<string>} - A promise that resolves with the path to the saved file
 */
async function saveTempFile(content, extension = "") {
  const randomFilename = `temp/sticker${Math.random() * 1000}${extension}`;
  await fs.writeFile(randomFilename, content);
  return randomFilename;
}

export { sendRequest, saveTempFile };