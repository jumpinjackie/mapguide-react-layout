export function getAssetPath(url: string | undefined): string | undefined {
    if (url) {
        //Return absolute urls as is
        if (url.indexOf("http://") >= 0) {
            return url;
        }
        if (url.indexOf("https://") >= 0) {
            return url;
        }
        //Return data URIs as-is
        if (url.indexOf("data:") >= 0) {
            return url;
        }
        //Otherwise anything relative is assumed to be relative to this
        return `stdassets/${url}`;
    } else {
        return undefined;
    }
}

export const STD_CSS_SPRITE_RELPATH = "images/icons.png";

export function getMainSprite(): string | undefined {
    return getAssetPath(STD_CSS_SPRITE_RELPATH);
}