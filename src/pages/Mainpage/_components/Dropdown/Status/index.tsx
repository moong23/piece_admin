import { useState, useEffect, useRef } from "react";
import ChevronIcon from "../../../../../assets/ChevronIcon";
import { UserProfileValidationResponse } from "../../../../../api";

const statusOptions = [
  { label: "보류", color: "red" },
  { label: "미완료", color: "purple" },
  { label: "수정 제출", color: "limegreen" },
  { label: "통과", color: "lightgray" },
];

interface StatusDropdownProps {
  user: UserProfileValidationResponse;
  // onChange: (status: string) => void;
}

const StatusDropdown = ({ user }: StatusDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(
    statusOptions.find((status) => status.label === user.profileStatus)
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!user.profileStatus) {
    return "-";
  }

  if (!selectedStatus) {
    console.log(user.profileStatus);
    throw new Error("Invalid status");
  }

  // // 드롭다운 영역 밖 클릭 시 드롭다운 닫기
  // const handleClickOutside = (event: any) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setShowDropdown(false);
  //   }
  // };

  // useEffect(() => {
  //   if (showDropdown) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [showDropdown]);

  return (
    <div
      className="w-full relative inline-block"
      ref={dropdownRef}
    >
      {/* 현재 선택된 status 표시 */}
      <div
        className="flex bg-grayscale-light3 items-center justify-between w-full cursor-pointer py-3 px-4 rounded"
        // onClick={() => setShowDropdown((prev) => !prev)}
      >
        <span className="flex flex-row gap-1.5 items-center">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: selectedStatus.color }}
          />
          <span className="text-heading-s font-medium">
            {selectedStatus.label}
          </span>
        </span>
        {/* <ChevronIcon
          width={12}
          height={12}
          rotate={showDropdown ? "up" : "down"}
        /> */}
      </div>
      {/* 드롭다운 목록 */}
      {/* {showDropdown && (
        <div className="absolute w-full mt-2 bg-white border rounded shadow-lg z-10">
          {statusOptions.map((status) => (
            <div
              key={status.label}
              className="flex items-center p-2 cursor-pointer rounded bg-grayscale-white hover:bg-grayscale-light2"
              onClick={() => {
                setSelectedStatus(status);
                setShowDropdown(false);
                onChange(status.label);
              }}
            >
              <span className="flex flex-row gap-1.5 items-center">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: status.color }}
                />
                <span className="text-heading-s font-medium">
                  {status.label}
                </span>
              </span>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default StatusDropdown;
