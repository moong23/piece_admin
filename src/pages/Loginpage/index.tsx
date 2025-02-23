import LogoSrc from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    await login(data.id, data.password)
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        navigate("/auth");
      })
      .catch((err) => {
        alert(`로그인 실패 : ${err}`);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <div className="w-full h-full flex flex-col items-center gap-10">
        <img
          src={LogoSrc}
          alt="logo"
          height={200}
        />
        <div className="flex flex-col p-10 gap-10 w-[432px]">
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col gap-2">
              <span className="text-heading-s font-semibold">아이디</span>
              <input
                className="bg-grayscale-light3 h-14 rounded-md py-3.5 px-5 text-heading-s font-meidum"
                type="text"
                {...register("id")}
                placeholder="아이디를 입력해주세요"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <span className="text-heading-s font-semibold">비밀번호</span>
              <input
                className="bg-grayscale-light3 h-14 rounded-md py-3.5 px-5 text-heading-s font-meidum"
                type="password"
                {...register("password")}
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-default py-3.5 text-grayscale-white text-body-m-sb rounded-md"
          >
            로그인
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
