import { AiOutlineArrowRight } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";

const JobCard = ({ title, description, link, functionModal }) => {
  return (
    <div className="transition-all max-w-sm bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-sm hover:shadow-2xl border-2 border-gray-800 hover:border-main">
      <div className="p-5 h-full flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <img
            className="h-4"
            src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${link}`}
            alt="af"
          />
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex w-full justify-between flex-wrap">
          <button
            onClick={()=>functionModal(true)}
            className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-blue-800 focus:ring-4 bg-blue-900 focus:ring-blue-800"
          >
            Read more
            <AiOutlineArrowRight />
          </button>
          <button className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-red-800 focus:ring-4 bg-red-900 focus:ring-red-800">
            Delete <HiOutlineTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
