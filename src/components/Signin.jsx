import { useForm } from "react-hook-form";

export default function Signin ({toSubmit}) {

  const toTransform = (data) => {
    toSubmit(data.username, data.password);
  }
  const {register, handleSubmit, formState} = useForm();
  const {errors} = formState;

  return (
        <div className="row justify-content-center">
          <form className="col-sm-3" onSubmit={handleSubmit(toTransform)}>
            <div className="d-flex">
              <label className="text-primary col-form-label text-nowrap flex-shrink-0 pe-3" htmlFor="username">
                帳號
              </label>
              <input
                type="email"
                className="form-control"
                id="username"
                placeholder="請輸入帳號"
                autoComplete="username"
                {...register("username",{
                  required: "請填寫使用者email",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email 格式不正確"
                  }
                })}
              />
            </div>
            {errors.username && <p className="text-danger small mt-1">{errors.username.message}</p>}
            <div className="d-flex mt-4">
              <label className="text-primary col-form-label text-nowrap flex-shrink-0 pe-3" htmlFor="password">
                密碼
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="請輸入密碼"
                autoComplete="current-password"
                {...register("password",{
                  required: "請填寫密碼",
                })}
              />
            </div>
            {errors.password && <p className="text-danger small mt-1">{errors.password.message}</p>}
            <button className="btn btn-primary w-100 mt-4" type="submit"
            >登入</button>
          </form>
        </div>
      )
}