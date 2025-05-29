import { Spinner, SpinnerSize as BpSpinSize } from "@blueprintjs/core";
import { SpinnerProps, SpinnerSize } from "../../element-context";
import React from "react";
import { variantToIntent } from "./utils";

function presetToSize(preset: SpinnerSize | undefined) {
    switch (preset) {
        case "small":
            return BpSpinSize.SMALL;
        case "standard":
            return BpSpinSize.STANDARD;
        case "large":
            return BpSpinSize.LARGE;
    }
    return undefined;
}

/**
 * @hidden
 */
export const BpSpinner: React.FC<SpinnerProps> = (props) => {
    return <Spinner intent={variantToIntent(props.variant)} size={presetToSize(props.sizePreset)} />;
}