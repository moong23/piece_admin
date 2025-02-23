import { PropsWithChildren } from "react";
import Topbar from "../components/Topbar";

interface Props extends PropsWithChildren {
  path: string;
}

const AdminLayout = ({ path, children }: Props) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Topbar isLogin={path !== "/"} />
      <div className="w-full h-full flex flex-row justify-center items-center">
        <div className="h-full w-[1200px]">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
