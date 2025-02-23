import { useMemo, useState } from "react";
import { ReportedUser, useReportedQuery } from "../../api";
import CustomTable from "../../components/Table";
import TopTab from "../../components/Toptab";
import CustomPagination from "../../components/Pagination";

const LIMIT = 10;
const MAX_BUTTON = 5;

const ReportPage = () => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalReport, setModalReport] = useState<ReportedUser | null>(null);

  const { data: ApiData, isLoading } = useReportedQuery(page - 1, LIMIT);
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
      <TopTab type="report" />
      <CustomTable>
        <colgroup>
          <col style={{ width: "16.6%" }} />
          <col style={{ width: "16.6%" }} />
          <col style={{ width: "16.6%" }} />
          <col style={{ width: "16.6%" }} />
          <col style={{ width: "33.2%" }} />
        </colgroup>
        <thead>
          <tr>
            <th>닉네임</th>
            <th>이름</th>
            <th>생년월일</th>
            <th>누적 신고 수</th>
            <th>신고 사유</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((report) => (
              <tr>
                <td>{report.nickName}</td>
                <td>{report.name}</td>
                <td>{report.birthdate}</td>
                <td>{report.totalReportedCnt}</td>
                <td>
                  <div
                    onClick={() => {
                      setShowModal(true);
                      setModalReport(report);
                    }}
                    className="px-2.5 py-3 border border-grayscale-dark3 rounded-xl"
                  >
                    {report.latestReportedReason}
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
      {showModal && modalReport && <></>}
    </div>
  );
};

export default ReportPage;
