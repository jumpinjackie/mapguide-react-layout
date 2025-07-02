import React from "react";
import { assertNever } from "../../../../utils/never";
import { HeadingProps } from "../../element-context";

export const BpHeading: React.FC<React.PropsWithChildren<HeadingProps>> = ({ level, className, style, children }) => {
    switch (level) {
        case 1:
            return <h1 className={`bp3-heading ${className}`} style={style}>{children}</h1>;
        case 2:
            return <h2 className={`bp3-heading ${className}`} style={style}>{children}</h2>;
        case 3:
            return <h3 className={`bp3-heading ${className}`} style={style}>{children}</h3>;
        case 4:
            return <h4 className={`bp3-heading ${className}`} style={style}>{children}</h4>;
        case 5:
            return <h5 className={`bp3-heading ${className}`} style={style}>{children}</h5>;
        case 6:
            return <h6 className={`bp3-heading ${className}`} style={style}>{children}</h6>;
        default:
            assertNever(level);
            return null;
    }
}