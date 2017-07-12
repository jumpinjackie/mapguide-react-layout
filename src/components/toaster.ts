import { Position, Toaster, IToaster } from "@blueprintjs/core";

let mToaster: IToaster | undefined;

export function getTopToaster() {
    if (!mToaster) {
        mToaster = Toaster.create({
            position: Position.TOP,
            className: "mg-toast mg-fusion-message-bar-toast"
        });
    }
    return mToaster;
}