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

  const isComplete = user.profileStatus === "완료";

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
        isRejected
          ? "bg-primary-default"
          : isComplete
          ? "bg-grayscale-light3"
          : "bg-primary-light"
      } w-full py-3 rounded-lg`}
      onClick={handleClickButton}
    >
      <span
        className={`${
          isRejected
            ? "text-grayscale-white"
            : isComplete
            ? "text-grayscale-dark3"
            : "text-primary-default"
        } text-heading-s`}
      >
        {text}
      </span>
    </div>
  );
};

export default ToggleButton;
