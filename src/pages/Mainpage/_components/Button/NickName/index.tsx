import { UserProfileValidationResponse } from "../../../../../api";
import ChevronIcon from "../../../../../assets/ChevronIcon";

const NicknameButton = ({
  user,
  onClick,
}: {
  user: UserProfileValidationResponse;
  onClick: () => void;
}) => {
  const handleClickButton = () => {
    onClick();
  };
  return (
    <div
      role="button"
      onClick={handleClickButton}
      className="border flex rounded-lg items-center border-grayscale-light2 p-3 justify-between flex-row"
    >
      <span className="text-grayscale-dark1 text-heading-s font-medium">
        {user.nickname}
      </span>
      <ChevronIcon
        width={16}
        height={16}
        rotate="right"
      />
    </div>
  );
};

export default NicknameButton;
