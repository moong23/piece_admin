import { useEffect, useState } from "react";
import { UserProfileValidationResponse, getUserById } from "../../../../api";

interface ModalAreaProps {
  user: UserProfileValidationResponse;
  onClose: () => void;
}

export interface UserProfileDetailResponse {
  imageUrl: string;
  nickname: string;
  responses: QuestionResponseType[];
}

interface QuestionResponseType {
  title: string;
  category: string;
  answer: string;
}

const ModalArea = ({ user, onClose }: ModalAreaProps) => {
  const [userDetailData, setUserDetailData] =
    useState<UserProfileDetailResponse>();
  const [detailIndex, setDetailIndex] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      await getUserById(user.userId)
        .then((res) => {
          setUserDetailData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUserData();
  }, []);

  return (
    userDetailData && (
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.3)]">
        <div className="w-[860px] h-[600px] rounded-lg bg-grayscale-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center flex-row justify-center gap-6">
          <button
            className="absolute right-5 top-4"
            onClick={onClose}
          >
            X
          </button>
          <div className="w-[220px] h-[220px] bg-grayscale-light1 rounded-lg">
            <img
              src={userDetailData.imageUrl}
              alt="user"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-5 items-center">
            <span
              onClick={() => {
                if (detailIndex === 0) return;
                setDetailIndex((prev) => prev - 1);
              }}
              className={`${
                detailIndex === 0
                  ? "bg-grayscale-dark3"
                  : "bg-primary-middle cursor-pointer"
              } w-8 h-8 rounded-full bg-grayscale-dark3 flex items-center justify-center`}
            >{`<`}</span>
            <div className="border border-grayscale-light2 max-h-[450px] flex flex-col gap-5 py-6 px-5 rounded-lg w-[450px]">
              <span className="text-[14px] font-semibold text-primary-default">
                {userDetailData.responses[detailIndex].title}
              </span>
              <span className="text-heading-s font-medium whitespace-pre-wrap">
                {userDetailData.responses[detailIndex].category}
              </span>
              <span className="bg-grayscale-light3 min-h-[124px] break-words whitespace-pre-wrap overflow-y-scroll px-4 py-3.5 rounded-lg">
                {userDetailData.responses[detailIndex].answer}
              </span>
            </div>
            <span
              onClick={() => {
                if (detailIndex === userDetailData.responses.length - 1) return;
                setDetailIndex((prev) => prev + 1);
              }}
              className={`${
                detailIndex === userDetailData.responses.length - 1
                  ? "bg-grayscale-dark3"
                  : "bg-primary-middle cursor-pointer"
              } w-8 h-8 rounded-full flex items-center justify-center`}
            >{`>`}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalArea;
