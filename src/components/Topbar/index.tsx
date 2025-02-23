import LogoSrc from "../../assets/logo1.png";

const Topbar = ({ isLogin }: { isLogin: boolean }) => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  return (
    <header className="h-20 px-auto flex w-full items-center justify-center border-b border-b-grayscale-light2">
      <div className="w-[1200px] flex justify-between">
        <span className="flex flex-row gap-2 items-center">
          <img
            src={LogoSrc}
            alt="logo"
            height={40}
            className="grow-0 h-10"
          />
          {isLogin && (
            <span className="text-body-m-sb px-5 py-2.5">
              <span className="decoration-grayscale-black underline">
                admin
              </span>
              <span className="text-grayscale-dark3">님, 안녕하세요.</span>
            </span>
          )}
        </span>
        {isLogin && (
          <span
            role="button"
            onClick={handleLogout}
            className="text-primary-default text-body-m-sb px-5 py-2.5"
          >
            로그아웃
          </span>
        )}
      </div>
    </header>
  );
};

export default Topbar;
