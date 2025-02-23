import { useMemo, useState } from "react";
import { useBlockQuery } from "../../api";
import CustomTable from "../../components/Table";
import TopTab from "../../components/Toptab";
import CustomPagination from "../../components/Pagination";

const LIMIT = 10;
const MAX_BUTTON = 5;

const ManagePage = () => {
  const [page, setPage] = useState(1);

  const { data: ApiData, isLoading } = useBlockQuery(page - 1, LIMIT);
  const data = ApiData?.content;

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

  return (
    <div className="py-5 flex flex-col gap-5">
      <TopTab type="manage" />
      <CustomTable>
        <colgroup>
          <col style={{ width: "16.6%" }} />
          <col style={{ width: "16.6%" }} />
          <col style={{ width: "16.6%" }} />
          <col style={{ width: "16.6%" }} />
          <col style={{ width: "16.6%" }} />
          <col style={{ width: "16.6%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>닉네임</th>
            <th>이름</th>
            <th>생년월일</th>
            <th>차단한 유저 닉네임</th>
            <th>차단한 유저 이름</th>
            <th>차단 날짜</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((block) => (
              <tr>
                <td>{block.blockedUserNickname}</td>
                <td>{block.blockedUserName}</td>
                <td>{block.blockedUserBirthdate}</td>
                <td>{block.blockingUserNickname}</td>
                <td>{block.blockingUserName}</td>
                <td>{block.blockedDate}</td>
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
    </div>
  );
};

export default ManagePage;
