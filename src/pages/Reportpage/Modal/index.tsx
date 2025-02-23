import { useEffect, useMemo, useState } from "react";
import {
  ReportedUser,
  getReportDetail,
  useReportedDetailQuery,
} from "../../../api";
import CustomTable from "../../../components/Table";
import CustomPagination from "../../../components/Pagination";

interface ModalAreaProps {
  report: ReportedUser;
  onClose: () => void;
}

const LIMIT = 10;
const MAX_BUTTON = 5;

const ReportModalArea = ({ report, onClose }: ModalAreaProps) => {
  const [page, setPage] = useState(1);

  const { data: ApiData, isLoading } = useReportedDetailQuery(
    report.userId,
    page - 1
  );

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

  const reportDetailData = ApiData?.content;

  return (
    reportDetailData && (
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.3)]">
        <div className="w-[860px] h-[600px] rounded-lg bg-grayscale-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center flex-row justify-center gap-6">
          <button
            className="absolute right-5 top-4"
            onClick={onClose}
          >
            X
          </button>
          <div className="flex flex-col gap-4">
            <CustomTable>
              <colgroup>
                <col style={{ width: "10%" }} />
                <col style={{ width: "70%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>횟수</th>
                  <th>신고 사유</th>
                  <th>신고 날짜</th>
                </tr>
              </thead>
              <tbody>
                {" "}
                {reportDetailData.map((reportDetail, index) => (
                  <tr key={index}>
                    <td>{reportDetail.cnt}</td>
                    <td>{reportDetail.reason}</td>
                    <td>{reportDetail.reportedDate}</td>
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
        </div>
      </div>
    )
  );
};

export default ReportModalArea;
