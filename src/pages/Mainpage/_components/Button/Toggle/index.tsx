import { useState, useEffect } from "react";
import { UserProfileValidationResponse } from "../../../../../api";

interface ToggleButtonProps {
  text: string;
  user: UserProfileValidationResponse;
  onUpdate: (updatedUser: UserProfileValidationResponse) => void;
}

const ToggleButton = ({ text, user, onUpdate }: ToggleButtonProps) => {
  const [isRejected, setIsRejected] = useState(
    text === "사진" ? user.rejectImage : user.rejectDescription
  );

  useEffect(() => {
    setIsRejected(text === "사진" ? user.rejectImage : user.rejectDescription);
  }, [user, text]);

  const isComplete = user.profileStatus === "통과";

  const handleClickButton = () => {
    if (isComplete) {
      return;
    }

    const updatedUser = { ...user };
    if (text === "사진") {
      updatedUser.rejectImage = !isRejected;
    } else {
      updatedUser.rejectDescription = !isRejected;
    }

    setIsRejected(!isRejected);
    onUpdate(updatedUser);
  };

  return (
    <div
      role="button"
      className={`${
        isComplete
          ? "bg-grayscale-light3 cursor-default"
          : isRejected
          ? "bg-primary-default"
          : "bg-primary-light"
      } w-full py-3 rounded-lg cursor-pointer`}
      onClick={handleClickButton}
    >
      <span
        className={`${
          isComplete
            ? "text-grayscale-dark3 cursor-default"
            : isRejected
            ? "text-grayscale-white"
            : "text-primary-default"
        } text-heading-s cursor-pointer`}
      >
        {text}
      </span>
    </div>
  );
};

export default ToggleButton;
