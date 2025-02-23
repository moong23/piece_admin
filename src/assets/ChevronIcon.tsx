import { SpinableIconProps } from "../types/icon";

const ChevronIcon = ({ width, height, fill, rotate }: SpinableIconProps) => {
  const direction =
    rotate === "up"
      ? "-90deg"
      : rotate === "down"
      ? "90deg"
      : rotate === "right"
      ? "0deg"
      : "180deg";
  return (
    <svg
      width={width || "12"}
      height={height || "12"}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="arrow_forward_ios"
        clipPath="url(#clip0_598_5288)"
        style={{
          transform: `rotate(${direction})`,
          transformOrigin: "50% 50%",
        }}
      >
        <path
          id="Vector"
          d="M3.24512 10.0648L4.13012 10.9498L9.08012 5.9998L4.13012 1.0498L3.24512 1.9348L7.31012 5.9998L3.24512 10.0648Z"
          fill={fill || "#5F5F60"}
        />
      </g>
      <defs>
        <clipPath id="clip0_598_5288">
          <rect
            width="12"
            height="12"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ChevronIcon;
