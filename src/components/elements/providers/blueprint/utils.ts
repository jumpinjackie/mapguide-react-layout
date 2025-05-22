import { IconName, Intent } from "@blueprintjs/core";
import { ElementVariant } from "../../element-context";

export function iconName(name: string | undefined): IconName | undefined {
    return name as IconName;
}

export function variantToIntent(variant: ElementVariant | undefined): Intent | undefined {
    switch (variant) {
        case "primary":
            return Intent.PRIMARY;
        case "secondary":
            return Intent.NONE;
        case "danger":
            return Intent.DANGER;
        case "success":
            return Intent.SUCCESS;
        default:
            return undefined;
    }
}