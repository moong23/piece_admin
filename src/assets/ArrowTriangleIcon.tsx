import { SpinableIconProps } from "../types/icon";

const ArrowTriangleIcon = ({
  width,
  height,
  fill,

  rotate,
}: SpinableIconProps) => {
  const direction =
    rotate === "right"
      ? "-90deg"
      : rotate === "left"
      ? "90deg"
      : rotate === "up"
      ? "180deg"
      : "0deg";
  return (
    <svg
      width={width || "24"}
      height={height || width || "24"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="arrow_drop_down"
        clipPath="url(#clip0_527_2186)"
      >
        <path
          id="Vector"
          d="M7 10L12 15L17 10H7Z"
          fill={fill || "#2D2D2E"}
          style={{
            transform: `rotate(${direction})`,
            transformOrigin: "50% 50%",
          }}
        />
      </g>
      <defs>
        <clipPath id="clip0_527_2186">
          <rect
            width="24"
            height="24"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowTriangleIcon;
