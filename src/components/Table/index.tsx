import { PropsWithChildren } from "react";
import "./index.css";

const CustomTable = ({ children }: PropsWithChildren) => {
  return <table className="w-full text-start">{children}</table>;
};

export default CustomTable;
