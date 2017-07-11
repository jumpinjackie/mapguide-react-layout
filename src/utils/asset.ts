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