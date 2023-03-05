// ================================================================================ //
// ================================ IMPORTS ======================================= //
// ================================================================================ //

// ========== Main imports ======================================================== //

import { useState } from "react";

// ========== Package components ================================================== //

import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";
import { AiOutlineSend } from "react-icons/ai";

// ========== Interfaces ========================================================== //

import {
  JobInterface,
  statusColorsVariants,
} from "../../interfaces/jobsInterfaces";
import FormErrors from "../FormErrors/FormErrors";

// ========== Prop types ========================================================== //

type PropsType_AddJob = {
  addJobFunction: () => void;
};

// ================================================================================ //
// ================================= COMPONENT ==================================== //
// ================================================================================ //

const AddJob = ({ addJobFunction }: PropsType_AddJob) => {
  // ========== Hooks =============================================================== //

  const [selectedStatus, setSelectedStatus] = useState<string>("later");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<JobInterface>();

  // ========== Variables =========================================================== //

  const TEXT_COLORS_VARIANTS: statusColorsVariants = {
    success: "success-text-style",
    rejected: "rejected-text-style",
    processing: "processing-text-style",
    applied: "applied-text-style",
    later: "later-text-style",
  };

  return (
    // ========== Return ============================================================== //

    <form
      onSubmit={handleSubmit(addJobFunction)}
      className="grid items-center h-full px-8 max-w-lg"
    >
      <h3 className="flex items-center text-3xl uppercase gap-2 pb-3 m-auto ">
        Add job
      </h3>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          {...register("title", { required: true, maxLength: 50 })}
          id="addTitle"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          maxLength={50}
        />
        <label
          htmlFor="addTitle"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-[5] origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Job title
        </label>
        {
          (errors.title?.type === "required" && (
            <FormErrors errorMessage="Insert a title for the job" />
          ),
          errors.title?.type === "maxLength" && (
            <FormErrors errorMessage="The title is too long" />
          ))
        }
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          {...register("link", {
            required: true,
            pattern:
              /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
          })}
          id="addLink"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="addLink"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-[5] origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Link
        </label>
        {
          (errors.link?.type === "required" && (
            <FormErrors errorMessage="Insert a link of the job" />
          ),
          errors.link?.type === "pattern" && (
            <FormErrors errorMessage="Insert a valid link" />
          ))
        }
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <textarea
          {...register("description", { required: true })}
          id="addDescription"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          rows={10}
        />
        <label
          htmlFor="addDescription"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 z-[5] origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
        >
          Description
        </label>
        {errors.description?.type === "required" && (
          <FormErrors errorMessage="Insert a description for the job" />
        )}
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <select
            {...register("status", { required: true })}
            id="jobStatus"
            onChange={() =>
              setSelectedStatus(
                (document.getElementById("jobStatus") as HTMLInputElement).value
              )
            }
            className={`block py-2.5 px-0 w-full text-sm bg-gray-800 border-0 border-b-2 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
              TEXT_COLORS_VARIANTS[
                selectedStatus as keyof typeof TEXT_COLORS_VARIANTS
              ]
            }`}
            placeholder=" "
          >
            <option className="later-text-style" value="later">
              Save for later
            </option>
            <option className="applied-text-style" value="applied">
              Applied
            </option>
            <option className="processed-text-style" value="processed">
              Processed
            </option>
            <option className="success-text-style" value="success">
              Success
            </option>
            <option className="rejected-text-style" value="rejected">
              Rejected
            </option>
          </select>
          <label
            htmlFor="jobStatus"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-[5] origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Status
          </label>
          {errors.status?.type === "required" && (
            <FormErrors errorMessage="Choose a status for the job" />
          )}
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            {...register("company", { required: true })}
            id="addCompany"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="addCompany"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-[5] origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company
          </label>
          {errors.company?.type === "required" && (
            <FormErrors errorMessage="Insert a company name" />
          )}
        </div>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <textarea
          {...register("requirements", { required: true })}
          id="jobRequirements"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          rows={10}
        />
        <label
          htmlFor="jobRequirements"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 z-[5] origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
        >
          Requirements
        </label>
        {errors.requirements?.type === "required" && (
          <FormErrors errorMessage="Insert the requirements for the job" />
        )}
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <textarea
          {...register("extra")}
          id="jobExtras"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          rows={10}
        />
        <label
          htmlFor="jobExtras"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 z-[5] origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
        >
          Extra data
        </label>
      </div>
      <div className="flex md:flex-row flex-col gap-4 w-full justify-between">
        <div className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center items-center gap-3">
          <input
            type="button"
            value="Clear"
            className="cursor-pointer"
            onClick={() => reset()}
          />
          <HiOutlineTrash />
        </div>
        <div className="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center flex justify-center items-center gap-3">
          <input type="submit" value="Submit" className="cursor-pointer" />
          <AiOutlineSend/>
        </div>
      </div>
      <Toaster />
    </form>
  );
};

export default AddJob;
