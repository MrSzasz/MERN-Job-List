// ================================================================================ //
// ================================ IMPORTS ======================================= //
// ================================================================================ //

// ========== Main imports ======================================================== //

import { useState } from "react";

// ========== Package components ================================================== //

import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";

// ========== Custom components =================================================== //

import FormErrors from "../FormErrors/FormErrors";

// ========== Interfaces ========================================================== //

import { UserInterface } from "../../interfaces/jobsInterfaces";

// ========== Helpers ============================================================= //

import {
  axios_USERS_addData,
  axios_USERS_getData,
} from "../../helpers/requests";
import { notifyErrorWithToast } from "../../helpers/errors";

// ================================================================================ //
// ================================= COMPONENT ==================================== //
// ================================================================================ //

const Form = () => {
  // ========== Hooks =============================================================== //

  const [registerForm, setRegisterForm] = useState(false);
  const [location, setLocation] = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // ========== Functions =========================================================== //

  const getLoginData = async (data: any): Promise<void> => {
    // Get the data from the form

    try {
      if (registerForm) {
        // Register a new user

        await axios_USERS_addData(
          { ...data, jobs: [] }, // Data to register
          "users" // Path to the back end
        );

        // Redirect to dashboard

        setLocation("/dashboard");
      } else {
        // User log in

        await axios_USERS_getData(data, "users");

        // Redirect to dashboard
        setLocation("/dashboard");
      }
    } catch (err) {
      notifyErrorWithToast(
        "Something went wrong, please try again later",
        err!
      );
    }
  };

  const changeFormToRegister = () => {
    setRegisterForm((current) => !current); // Set the form to register or login
  };

  // ========== Variables =========================================================== //

  const ERRORS_TYPES_PASSWORD = {
    required: <FormErrors errorMessage="Insert a password" />,
    maxLength: (
      <FormErrors errorMessage="The password is too long. Maximum length of this field is 21 characters" />
    ),
    minLength: (
      <FormErrors errorMessage="The password is too short. Minimum length of this field is 8 characters" />
    ),
  };

  // ========== Return ============================================================== //
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
            {...register("email", {
              required: true,
              pattern:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            })}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {
            (errors.email?.type === "required" && (
              <FormErrors errorMessage="Insert a mail" />
            ),
            errors.email?.type === "pattern" && (
              <FormErrors errorMessage="The password is too long. Maximum length of this field is 21 characters" />
            ))
          }
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 21,
            })}
            minLength={8}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {ERRORS_TYPES_PASSWORD[
            errors.password?.type as keyof typeof ERRORS_TYPES_PASSWORD
          ] || null}
        </div>
        {registerForm && (
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              {...register("repeatPassword", {
                required: true,

                validate: (val: string) => {
                  if (watch("password") != val) {
                    return false;
                  }
                },
              })}
              id="repeatPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="repeatPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
            {errors.repeatPassword?.type === "validate" && (
              <FormErrors errorMessage="The passwords don't match" />
            )}
          </div>
        )}
        <div className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center items-center gap-4">
          <input
            value={registerForm ? "Register" : "Login"}
            type="submit"
            className="cursor-pointer"
          />
          <FiLogOut />
        </div>
      </form>
      <div className="flex flex-col items-center gap-4">
        {!registerForm && <h2>No account?</h2>}
        <div className="flex flex-col gap-2">
          <button
            onClick={changeFormToRegister}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center gap-3"
          >
            {registerForm ? "Cancel" : "Register"}
            {registerForm ? <MdOutlineClose /> : <FiLogOut />}
          </button>
          {/* {!registerForm && (
            <Link
              href="/dashboard"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Enter without account
            </Link>
          )} */}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Form;
