import { IconName, Intent } from "@blueprintjs/core";
import { ElementVariant } from "../../element-context";

/**
 * @hidden
 */
export function iconName(name: string | undefined): IconName | undefined {
    return name as IconName;
}

/**
 * @hidden
 */
export function variantToIntent(variant: ElementVariant | undefined): Intent | undefined {
    switch (variant) {
        case "primary":
            return Intent.PRIMARY;
        case "warning":
            return Intent.WARNING;
        case "danger":
            return Intent.DANGER;
        case "success":
            return Intent.SUCCESS;
        default:
            return undefined;
    }
}