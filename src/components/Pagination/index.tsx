interface CustomPaginationProps {
  fetchPage: (page: number) => void;
  hasNext: boolean;
  startPage: number;
  endPage: number;
}

const CustomPagination = ({
  fetchPage,
  hasNext,
  startPage,
  endPage,
}: CustomPaginationProps) => {
  return (
    <div className="flex flex-row justify-center gap-2">
      <button
        className={`w-10 h-10 rounded-lg ${
          startPage > 1
            ? "bg-primary-default text-grayscale-white"
            : "bg-grayscale-light2 text-grayscale-dark2 cursor-not-allowed"
        }`}
        onClick={() => startPage > 1 && fetchPage(startPage - 1)}
        disabled={startPage <= 1}
      >
        {"<"}
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <button
          key={startPage + i}
          className="bg-primary-default text-grayscale-white w-10 h-10 rounded-lg"
          onClick={() => fetchPage(startPage + i)}
        >
          {startPage + i}
        </button>
      ))}

      <button
        className={`w-10 h-10 rounded-lg ${
          hasNext
            ? "bg-primary-default text-grayscale-white"
            : "bg-grayscale-light2 text-grayscale-dark2 cursor-not-allowed"
        }`}
        onClick={() => hasNext && fetchPage(endPage + 1)}
        disabled={!hasNext}
      >
        {">"}
      </button>
    </div>
  );
};

export default CustomPagination;
