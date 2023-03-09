// ================================================================================ //
// ================================ IMPORTS ======================================= //
// ================================================================================ //

// ========== Package components ================================================== //

import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";

// ========== Interfaces ========================================================== //

import {
  statusColorsVariants,
  JobInterface,
} from "../../interfaces/jobsInterfaces";

// ========== Prop types ========================================================== //

type PropsType_JobCard = {
  job: JobInterface;
  functionModal: (arg0: boolean, arg1: string) => void;
  deleteJobFunction: (jobId: string) => void;
};

// ========== Helpers ============================================================= //

// ================================================================================ //
// ================================= COMPONENT ==================================== //
// ================================================================================ //

const JobCard = ({
  job,
  functionModal,
  deleteJobFunction,
}: PropsType_JobCard) => {
  // ========== Variables =========================================================== //

  const TEXT_COLORS_VARIANTS: statusColorsVariants = {
    success: "success-text-style",
    rejected: "rejected-text-style",
    processing: "processing-text-style",
    applied: "applied-text-style",
    later: "later-text-style",
  };

  const BORDER_COLORS_VARIANTS: statusColorsVariants = {
    success: "hover:border-success",
    rejected: "hover:border-rejected",
    processing: "hover:border-processing",
    applied: "hover:border-applied",
    later: "hover:border-later",
  };

  return (
    // ========== Return ============================================================== //

    <div
      className={`transition-all max-w-sm rounded-lg max-h-60 bg-gray-800 shadow-sm hover:shadow-2xl border-2 border-gray-800 basis-[100%] ${
        BORDER_COLORS_VARIANTS[job.status]
      }`}
    >
      <div className="p-5 h-full flex flex-col justify-between">
        <div className="flex flex-wrap">
          <div className="flex items-center gap-2 w-full">
            <img
              className="h-4"
              src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${job.link}`}
              alt="af"
            />
            <h5
              className="text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {job.title.toLowerCase()}
            </h5>
          </div>
          <small
            className={`${
              TEXT_COLORS_VARIANTS[job.status as keyof statusColorsVariants]
            } pb-3`}
          >
            {job.status}
          </small>
        </div>
        <p
          className="mb-3 font-normal text-gray-700 dark:text-gray-400"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            cursor: "default",
          }}
        >
          {job.description}
        </p>
        <div className="flex w-full justify-between flex-wrap">
          <button
            onClick={() => {
              functionModal(true, job.id);
            }}
            className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-blue-800 focus:ring-4 bg-blue-900 focus:ring-blue-800"
          >
            Read more
            <AiOutlineArrowRight />
          </button>
          <button
            onClick={() => deleteJobFunction(job.id)}
            className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-red-800 focus:ring-4 bg-red-900 focus:ring-red-800"
          >
            Delete <HiOutlineTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
