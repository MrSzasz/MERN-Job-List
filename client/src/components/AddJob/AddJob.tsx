import { useForm, SubmitHandler } from "react-hook-form";
import { JobInterface } from "../../interfaces/jobsInterfaces";
import { Toaster } from "react-hot-toast";

const AddJob = ({addJobFunction}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<JobInterface>();


  return (
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
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Job title
        </label>
        {
          (errors.title?.type === "required" && (
            <small className="text-red-500">Insert a title for the job</small>
          ),
          errors.title?.type === "maxLength" && (
            <small className="text-red-500">The title is too long</small>
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
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Link
        </label>
        {
          (errors.link?.type === "required" && (
            <small className="text-red-500">Insert a link of the job</small>
          ),
          errors.link?.type === "pattern" && (
            <small className="text-red-500">Insert a valid link</small>
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
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Description
        </label>
        {errors.description?.type === "required" && (
          <small className="text-red-500">
            Insert a description for the job
          </small>
        )}
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group">
          <select
            {...register("status", { required: true })}
            id="jobStatus"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-gray-800 border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          >
            <option className="later" value="later">
              Save for later
            </option>
            <option className="applied" value="applied">
              Applied
            </option>
            <option className="processed" value="processed">
              Processed
            </option>
            <option className="success" value="success">
              Success
            </option>
            <option className="rejected" value="rejected">
              Rejected
            </option>
          </select>
          <label
            htmlFor="jobStatus"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Status
          </label>
          {errors.status?.type === "required" && (
            <small className="text-red-500">Choose a status for the job</small>
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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Company
          </label>
          {errors.company?.type === "required" && (
            <small className="text-red-500">Insert a company name</small>
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
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Requirements
        </label>
        {errors.requirements?.type === "required" && (
          <small className="text-red-500">
            Insert the requirements for the job
          </small>
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
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Extra data
        </label>
      </div>
      <input
        type="submit"
        className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        value="Submit"
      />
      <Toaster />
    </form>
  );
};

export default AddJob;
