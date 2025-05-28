import { AnyMediaMessageContent } from "baileys";
import { getTotalVideoBufferLengthInSeconds } from "../../libs/util.js";
import { Readable } from "stream";

export async function parseMedia(
  media: any,
  mediaType?: string,
  mimeType?: string,
  caption?: string,
): Promise<AnyMediaMessageContent> {
  let info: AnyMediaMessageContent;
  switch (mediaType) {
    case "sticker":
      info = {
        sticker: media,
      };
      break;
    case "image/gif":
      info = {
        video: media,
        gifPlayback: true,
        caption: caption,
      };
      break;
    case "image":
      info = {
        image: media,
        mimetype: mimeType,
        caption: caption,
      };
      break;
    case "video":
      info = {
        video: { stream: Readable.from(media) },
        mimetype: mimeType,
        caption: caption,
        seconds: await getTotalVideoBufferLengthInSeconds(media),
      };
      break;
    case "audio":
      info = {
        audio: media,
        mimetype: mimeType,
        caption: caption,
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
