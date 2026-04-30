// Minimal provider – Heading component
import React from "react";
import type { HeadingProps } from "../../element-context";
import { assertNever } from "../../../../utils/never";

/**
 * @hidden
 * @since 0.15
 */
export const MnHeading: React.FC<React.PropsWithChildren<HeadingProps>> = ({ level, style, className, children }) => {
   const cls = ["mrl-heading", className].filter(Boolean).join(" ");
   switch (level) {
      case 1:
         return <h1 className={cls} style={style}>{children}</h1>;
      case 2:
         return <h2 className={cls} style={style}>{children}</h2>;
      case 3:
         return <h3 className={cls} style={style}>{children}</h3>;
      case 4:
         return <h4 className={cls} style={style}>{children}</h4>;
      case 5:
         return <h5 className={cls} style={style}>{children}</h5>;
      case 6:
         return <h6 className={cls} style={style}>{children}</h6>;
      default:
         assertNever(level);
         return null;
   }
};
