
/**
 * 
 * @param {*} media 
 * @param {string} mediaType 
 * @param {string} mimeType 
 * @param {string} caption 
 * @returns Object with the content type and media
 */
function parseMedia(media, mediaType, mimeType, caption) {
    if (mediaType == "sticker" ){
        return {
            sticker: media
        }
    } else if (mimeType == "image/gif") {
        return {
            video: media,
            gifPlayback: true,
            caption: caption
        }
    }  else if (["image", "video", "audio"].includes(mediaType)) {
        return {
            [mediaType]: media,
            caption: caption
        }
    }
}

export {
    parseMedia
};