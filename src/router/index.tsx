import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Loginpage";
import AdminLayout from "./layout";
import MainPage from "../pages/Mainpage";
import ManagePage from "../pages/Managepage";
import ReportPage from "../pages/Reportpage";

const routerList = [
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/auth",
    component: MainPage,
  },
  {
    path: "/manage",
    component: ManagePage,
  },
  {
    path: "/report",
    component: ReportPage,
  },
];

const AdminRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routerList.map((item) => {
          return (
            <Route
              key={item.path}
              path={item.path}
              element={
                <AdminLayout path={item.path}>
                  <item.component />
                </AdminLayout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};
export default AdminRouter;
