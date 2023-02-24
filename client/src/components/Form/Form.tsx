import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "wouter";

const Form = () => {
  const [registerForm, setRegisterForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getLoginData = (data) => {
    console.log(data);
  };

  const changeFormToRegister = () => {
    setRegisterForm((current) => !current);
  };

  return (
    <div className="h-full flex flex-col p-8">
      <form
        onSubmit={handleSubmit(getLoginData)}
        className="p-8 flex flex-col justify-center h-full"
      >
        <h2 className="text-center pb-8 text-4xl">
          {registerForm ? "Register" : "Sign in"}
        </h2>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            {...register("loginEmail", {
              required: true,
              pattern:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            })}
            id="loginEmail"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="loginEmail"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {
            (errors.loginEmail?.type === "required" && (
              <small className="text-red-500">Insert a mail</small>
            ),
            errors.loginEmail?.type === "pattern" && (
              <small className="text-red-500">Insert a valid mail</small>
            ))
          }
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            {...register("loginPassword", { required: true })}
            id="loginPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="loginPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {errors.loginPassword?.type === "required" && (
            <small className="text-red-500">Insert a password</small>
          )}
        </div>
        <input
          value={registerForm ? "Register" : "Login"}
          type="submit"
          className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </form>
      <div className="flex flex-col items-center gap-4">
        {!registerForm && <h2>No account?</h2>}
        <div className="flex flex-col gap-2">
          <button
            onClick={changeFormToRegister}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {registerForm ? "Cancel" : "Register"}
          </button>
          {!registerForm && (
            <Link
              href="/dashboard"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Enter without account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
