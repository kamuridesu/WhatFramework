import { AnyMediaMessageContent } from '@whiskeysockets/baileys'

function parseMedia(media: any, mediaType: string | undefined, mimeType: string | undefined, caption: string | undefined): AnyMediaMessageContent {
    let info: AnyMediaMessageContent;
    switch (mediaType) {
        case "sticker":
            info = {
                sticker: media
            };
            break;
        case "image/gif":
            info = {
                video: media,
                gifPlayback: true,
                caption: caption
            };
            break;
        case "image":
            info = {
                image: media,
                mimetype: mimeType,
                caption: caption
            };
            break;
        case "video":
            info = {
                video: media,
                mimetype: mimeType,
                caption: caption
            };
            break;
        case "audio":
            info = {
                audio: media,
                mimetype: mimeType,
                caption: caption
            };
            break;
        case "voice":
            info = {
                audio: media,
                mimetype: mimeType,
                ptt: true,
            };
            break;
        default:
            throw new Error(`Unknown media type: ${mediaType}`);
    }
    return info;
}

export {
    parseMedia
};
