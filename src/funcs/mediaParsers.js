
/**
 * 
 * @param {*} media 
 * @param {string} mediaType 
 * @param {string} mimeType 
 * @param {string} caption 
 * @returns {Object} with the content type and media
 */
function parseMedia(media, mediaType, mimeType, caption) {
    switch (mediaType) {
        case "sticker":
            return {
                sticker: media
            };
        case "image/gif":
            return {
                video: media,
                gifPlayback: true,
                caption: caption
            };
        case "image":
        case "video":
        case "audio":
            return {
                [mediaType]: media,
                mimetype: mimeType,
                caption: caption
            };
        case "voice":
            return {
                audio: media,
                mimetype: mimeType,
                ptt: true,
            }
        default:
            throw new Error(`Unknown media type: ${mediaType}`);
    }
}

export {
    parseMedia
};
