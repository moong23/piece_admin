import { useMemo, useState } from "react";
import TopTab from "../../components/Toptab";
import {
  UserProfileValidationResponse,
  updateProfileStatus,
  useUserQuery,
} from "../../api";
import CustomTable from "../../components/Table";
import { formatContact, formatDate } from "../../utils";
import NicknameButton from "./_components/Button/NickName";
import StatusDropdown from "./_components/Dropdown/Status";
import ToggleButton from "./_components/Button/Toggle";
import CustomPagination from "../../components/Pagination";
import ModalArea from "./_components/Modal";

const LIMIT = 10;
const MAX_BUTTON = 5;

const MainPage = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalUser, setModalUser] =
    useState<UserProfileValidationResponse | null>();
  const { data: ApiData, isLoading } = useUserQuery(page - 1, LIMIT);

  const [data, setData] = useState<UserProfileValidationResponse[]>([]);

  useMemo(() => {
    if (ApiData) {
      setData(ApiData.content);
    }
  }, [ApiData]);

  const totalElements = ApiData ? ApiData.totalElements : 0;
  const totalPage = useMemo(
    () => Math.ceil(totalElements / LIMIT),
    [totalElements]
  );

  const hasNext = useMemo(() => page < totalPage, [page, totalPage]);
  const startPage = useMemo(
    () => Math.max(page - Math.floor(MAX_BUTTON / 2), 1),
    [page]
  );
  const endPage = useMemo(
    () => Math.min(startPage + MAX_BUTTON - 1, totalPage),
    [startPage, totalPage]
  );

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 🔹 user 상태 업데이트 함수
  const handleUpdateUser = (updatedUser: UserProfileValidationResponse) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.userId === updatedUser.userId ? updatedUser : user
      )
    );
  };

  const handleSubmit = async (user: UserProfileValidationResponse) => {
    if (user.profileStatus === "완료") {
      return;
    }
    console.log(user);
    await updateProfileStatus(
      user.userId,
      user.rejectImage,
      user.rejectDescription
    )
      .then(() => {
        alert("수정 완료");
        location.reload();
      })
      .catch((err) => {
        alert("수정중 에러 발생" + err);
      });
  };

  const handleClickUserProfile = (user: UserProfileValidationResponse) => {
    setShowModal(true);
    setModalUser(user);
  };

  return (
    <div className="py-5 flex flex-col gap-5">
      <TopTab type="profile" />
      <CustomTable>
        <colgroup>
          <col style={{ width: "15%" }} />
          <col style={{ width: "8.5%" }} />
          <col style={{ width: "10.5%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10.5%" }} />
          <col style={{ width: "13.3%" }} />
          <col style={{ width: "18.6%" }} />
          <col style={{ width: "8.5%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>매칭 프로필</th>
            <th>이름</th>
            <th>생년월일</th>
            <th>전화번호</th>
            <th>가입일</th>
            <th>상태</th>
            <th>부적격</th>
            <th>제출</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.userId}>
              <td>
                <NicknameButton
                  onClick={() => handleClickUserProfile(user)}
                  user={user}
                />
              </td>
              <td>{user.name || "-"}</td>
              <td>{formatDate(user.birthdate) || "-"}</td>
              <td>{formatContact(user.phoneNumber) || "-"}</td>
              <td>{formatDate(user.joinDate) || "-"}</td>
              <td>
                <StatusDropdown user={user} />
              </td>
              <td>
                <div className="w-full flex flex-row gap-2">
                  <ToggleButton
                    text="사진"
                    user={user}
                    onUpdate={handleUpdateUser} // 🔹 상태 업데이트 전달
                  />
                  <ToggleButton
                    text="소개글"
                    user={user}
                    onUpdate={handleUpdateUser} // 🔹 상태 업데이트 전달
                  />
                </div>
              </td>
              <td>
                <div
                  role="button"
                  onClick={() => handleSubmit(user)}
                  className={`${
                    user.profileStatus === "완료"
                      ? "bg-grayscale-light1 text-grayscale-white"
                      : "bg-grayscale-white text-grayscale-black"
                  } text-heading-s border rounded-lg py-3`}
                >
                  제출
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </CustomTable>
      <CustomPagination
        fetchPage={setPage}
        hasNext={hasNext}
        startPage={startPage}
        endPage={endPage}
      />
      {showModal && modalUser && (
        <ModalArea
          user={modalUser}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MainPage;
