/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, ThemeUIStyleObject } from "theme-ui";
import icons from "../icons";

interface IconProps {
    readonly name: keyof typeof icons;
    readonly symbolColor?: string;
    readonly backgroundColor?: string;
    readonly size?: number;
    readonly className?: string;
    readonly sx?: ThemeUIStyleObject;
}

const viewBox: string = "0 0 24 24";

const Icon = ({ name, symbolColor, backgroundColor, size, className }: IconProps) => {
    const { path } = icons[name];
    const iconSize = size ? size : 1;
    return (
        <svg
            className={className}
            sx={{ height: `${iconSize}px`, width: `${iconSize}px` }}
            viewBox={viewBox}
        >
            <circle cx="12" cy="12" r="11" sx={{ fill: backgroundColor ? backgroundColor : "currentColor", stroke: "black", strokeWidth: "1" }} />
            <path d={path} sx={{ fill: symbolColor ? symbolColor : "currentColor" }} />
        </svg >
    );
};

export default Icon;