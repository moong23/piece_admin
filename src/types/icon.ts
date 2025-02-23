export interface IconProps {
  width: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
}

export interface ClickableIconProps extends IconProps {
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
}

export interface SpinableIconProps extends IconProps {
  rotate: "up" | "right" | "down" | "left";
}

export interface ClickableSpinableIconProps extends ClickableIconProps {
  rotate: "up" | "right" | "down" | "left";
}
