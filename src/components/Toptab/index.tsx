import { useNavigate } from "react-router-dom";

interface TopTabProps {
  type: "profile" | "manage" | "report";
}

const TopTab = ({ type }: TopTabProps) => {
  const navigate = useNavigate();

  const handleClick = (type: string) => {
    if (type === "profile") {
      navigate("/auth");
    } else {
      navigate("/manage");
    }
  };
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row">
        <div
          role="button"
          onClick={() => handleClick("profile")}
          className={`${
            type === "profile"
              ? "text-grayscale-black border-b-grayscale-black"
              : "text-grayscale-dark3 border-b-grayscale-light2"
          } py-5 px-6 text-heading-m font-semibold border-b-2`}
        >
          회원 프로필 심사
        </div>
        <div
          role="button"
          onClick={() => handleClick("manage")}
          className={`${
            type === "profile"
              ? "text-grayscale-dark3 border-b-grayscale-light2"
              : "text-grayscale-black border-b-grayscale-black"
          } py-5 px-6 text-heading-m font-semibold border-b-2`}
        >
          신고 유저 검토 및 제재
        </div>
      </div>
      {type === "manage" ? (
        <div className="flex h-[52px] rounded-xl flex-row p-2 bg-grayscale-light2">
          <div className="text-heading-s font-medium text-grayscale-dark1 flex items-center justify-center px-4 cursor-pointer w-1/2 h-[38px] rounded-lg bg-grayscale-white">
            차단
          </div>
          <div
            onClick={() => navigate("/report")}
            className="text-heading-s font-medium text-grayscale-dark1 flex items-center justify-center px-4 cursor-pointer w-1/2 h-[38px] rounded-lg bg-grayscale-light2"
          >
            신고
          </div>
        </div>
      ) : type === "report" ? (
        <div className="flex h-[52px] rounded-xl flex-row p-2 bg-grayscale-light2">
          <div
            onClick={() => navigate("/manage")}
            className="text-heading-s font-medium text-grayscale-dark1 flex items-center justify-center px-4 cursor-pointer w-1/2 h-[38px] rounded-lg bg-grayscale-light2"
          >
            차단
          </div>
          <div className="text-heading-s font-medium text-grayscale-dark1 flex items-center justify-center px-4 cursor-pointer w-1/2 h-[38px] rounded-lg bg-grayscale-white">
            신고
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TopTab;
