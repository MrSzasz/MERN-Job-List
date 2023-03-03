// import { useState } from "react";
// import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
// import { BiLinkExternal } from "react-icons/bi";
// import { HiOutlineTrash } from "react-icons/hi";
// import { axios_JOBS_updateData } from "../../helpers/requests";
// import { JobInterface } from "../../interfaces/jobsInterfaces";

// const JobDetails = ({ job, deleteJobFunction, functionModal }) => {
//   const [editMode, setEditMode] = useState(false);
//   const [invalidLink, setInvalidLink] = useState(false);

//   const checkValidLink = () => {
//     const linkElement = document.querySelector("#editJobLink")?.textContent!;

//     const pattern =
//       /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

//     return pattern.test(linkElement);
//   };

//   const handleDeleteJobOnModal = (jobID: string) => {
//     deleteJobFunction(jobID);
//     functionModal();
//   };

//   const handleUpdate = () => {
//     if (checkValidLink()) {
//       const jobToUpdate: JobInterface = {
//         title: (document.querySelector("#editJobTitle") as HTMLInputElement)
//           .textContent!,
//         link: (document.querySelector("#editJobLink") as HTMLInputElement)
//           .textContent!,
//         description: (
//           document.querySelector("#editJobDescription") as HTMLElement
//         ).innerText!,
//         status: (document.querySelector("#editJobStatus") as HTMLInputElement)
//           .value,
//         company: (document.querySelector("#editJobCompany") as HTMLInputElement)
//           .textContent!,
//         requirements: (
//           document.querySelector("#editJobRequirements") as HTMLElement
//         ).innerText,
//         extra:
//           (document.querySelector("#editJobExtra") as HTMLElement).innerText ||
//           null,
//       };
//       // console.log({
//       //   title: document.querySelector("#editJobTitle")?.textContent,
//       //   link: document.querySelector("#editJobLink")?.textContent,
//       //   description: (
//       //     document.querySelector("#editJobDescription") as HTMLElement
//       //   ).innerText,
//       //   status: (document.querySelector("#editJobStatus") as HTMLInputElement)
//       //     .value,
//       //   company: document.querySelector("#editJobCompany")?.textContent,
//       //   requirements: (
//       //     document.querySelector("#editJobRequirements") as HTMLElement
//       //   ).innerText,
//       //   extra:
//       //     (document.querySelector("#editJobExtra") as HTMLElement).innerText ||
//       //     null,
//       // });

//       // console.log(jobToUpdate);
//       axios_JOBS_updateData(jobToUpdate, "http://localhost:3001/jobs")
//       setEditMode((current) => !current);
//       setInvalidLink(false);
//     } else {
//       setInvalidLink(true);
//     }
//   };

//   const textColorVariants = {
//     success: "success-text-style",
//     rejected: "rejected-text-style",
//     processing: "processing-text-style",
//     applied: "applied-text-style",
//     later: "later-text-style",
//   };

//   const editable =
//     "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

//   const nonEditable =
//     "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

//   return (
//     <div className="grid place-content-center items-center h-full">
//       {editMode ? (
//         <>
//           <h3
//             id="editJobTitle"
//             contentEditable={editMode}
//             className="flex items-center text-3xl uppercase gap-2 border-0 border-b-2 border-gray-300"
//           >
//             {job.title}
//           </h3>
//           <small
//             contentEditable={editMode}
//             id="editJobLink"
//             className="text-blue-600 border-0 border-b-2 border-gray-300"
//           >
//             {job.link}
//           </small>
//           {invalidLink && (
//             <small className="text-red-600">Please insert a valid link</small>
//           )}
//         </>
//       ) : (
//         <a
//           href={job.link}
//           target="_blank"
//           className="flex items-center text-3xl uppercase gap-2 hover:text-blue-600 w-fit transition-all"
//         >
//           <h3 contentEditable={editMode} className="text-center">
//             {job.title}
//           </h3>
//           <BiLinkExternal size={14} />
//         </a>
//       )}
//       <div className="flex justify-between">
//         <small className="text-gray-600 uppercase">
//           by{" "}
//           <span
//             id="editJobCompany"
//             contentEditable={editMode}
//             className={editMode ? "border-0 border-b-2 border-gray-300" : ""}
//           >
//             {job.company}
//           </span>
//         </small>
//         <small className="text-gray-500">Added: {job.date}</small>
//       </div>
//       {editMode ? (
//         <select
//           id="editJobStatus"
//           className={`bg-gray-800 text-xs italic w-fit pb-3 pt-2`}
//           defaultValue={job.status}
//         >
//           <option value="success" className="success-text-style">
//             Success
//           </option>
//           <option value="rejected" className="rejected-text-style">
//             Rejected
//           </option>
//           <option value="processing" className="processing-text-style">
//             Processing
//           </option>
//           <option value="applied" className="applied-text-style">
//             Applied
//           </option>
//           <option value="later" className="later-text-style">
//             Save for later
//           </option>
//         </select>
//       ) : (
//         <small className={`${textColorVariants[job.status]} pb-3`}>
//           {job.status}
//         </small>
//       )}
//       <hr />
//       <div className="relative z-0 w-full">
//         <h4 className="text-xl uppercase underline pt-4">Description</h4>
//         <p
//           id="editJobDescription"
//           contentEditable={editMode}
//           className={`${
//             editMode ? editable : nonEditable
//           } pb-8 whitespace-pre-line`}
//         >
//           {job.description}
//         </p>
//       </div>
//       <div className="relative z-0 w-full">
//         <h4 className="text-xl uppercase underline">Requirements</h4>
//         <p
//           id="editJobRequirements"
//           contentEditable={editMode}
//           className={`${
//             editMode ? editable : nonEditable
//           } pb-8 whitespace-pre-line`}
//         >
//           {job.requirements}
//         </p>
//         {job.extra && (
//           <>
//             <h4 className="text-xl uppercase underline">Extras</h4>
//             <p
//               id="editJobExtra"
//               contentEditable={editMode}
//               className={`${
//                 editMode ? editable : nonEditable
//               } whitespace-pre-line`}
//             >
//               {job.extra}
//             </p>
//           </>
//         )}
//       </div>
//       <div className="flex justify-between pt-8">
//         {editMode ? (
//           <button
//             onClick={() => handleUpdate()}
//             className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg focus:ring-4 hover:bg-green-800 bg-green-900 focus:ring-green-800"
//           >
//             Done <AiOutlineCheck />
//           </button>
//         ) : (
//           <button
//             onClick={() => setEditMode((current) => !current)}
//             className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg focus:ring-4 hover:bg-blue-800 bg-blue-900 focus:ring-blue-800"
//           >
//             Edit <AiFillEdit />
//           </button>
//         )}
//         {!editMode && (
//           <button
//             onClick={() => handleDeleteJobOnModal(job._id)}
//             className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-red-800 focus:ring-4 bg-red-900 focus:ring-red-800"
//           >
//             Delete <HiOutlineTrash />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobDetails;

import { useState } from "react";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { axios_JOBS_updateData } from "../../helpers/requests";
import { JobInterface } from "../../interfaces/jobsInterfaces";
import DOMPurify from "dompurify";

const JobDetails = ({
  job,
  deleteJobFunction,
  updateJobFunction,
  functionModal,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const [selectedEditStatus, setSelectedEditStatus] = useState(job.status);
  const [selectedEditTitle, setSelectedEditTitle] = useState(job.title);
  const [selectedEditLink, setSelectedEditLink] = useState(job.link);

  const checkValidLink = () => {
    const linkElement = document.querySelector("#editJobLink")?.textContent!;

    const pattern =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

    return pattern.test(linkElement);
  };

  const handleDeleteJobOnModal = (jobID: string) => {
    deleteJobFunction(jobID);
    functionModal();
  };

  const handleUpdate = () => {
    if (checkValidLink()) {
      const jobToUpdate: JobInterface = {
        id: job.id,
        title: (document.querySelector("#editJobTitle") as HTMLInputElement)
          .textContent!,
        link: (document.querySelector("#editJobLink") as HTMLInputElement)
          .textContent!,
        description: (
          document.querySelector("#editJobDescription") as HTMLElement
        ).innerText!,
        status: (document.querySelector("#editJobStatus") as HTMLInputElement)
          .value,
        company: (document.querySelector("#editJobCompany") as HTMLInputElement)
          .textContent!,
        requirements: (
          document.querySelector("#editJobRequirements") as HTMLElement
        ).innerText,
        date: job.date,
        extra:
          (document.querySelector("#editJobExtra") as HTMLElement)?.innerText ||
          null,
      };
      setSelectedEditTitle(jobToUpdate.title);
      setSelectedEditLink(jobToUpdate.link);
      updateJobFunction(job.id, jobToUpdate);
      setEditMode((current) => !current);
      setInvalidLink(false);
    } else {
      setInvalidLink(true);
    }
  };

  const textColorVariants = {
    success: "success-text-style",
    rejected: "rejected-text-style",
    processing: "processing-text-style",
    applied: "applied-text-style",
    later: "later-text-style",
  };

  const editable =
    "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

  const nonEditable =
    "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";

  return (
    <div className="grid place-content-center items-center h-full">
      {editMode ? (
        <>
          <h3
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(selectedEditTitle),
            }}
            id="editJobTitle"
            contentEditable={editMode}
            className="flex items-center text-3xl uppercase gap-2 border-0 border-b-2 border-gray-300"
          />
          <small
            contentEditable={editMode}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(selectedEditLink),
            }}
            id="editJobLink"
            className="text-blue-600 border-0 border-b-2 border-gray-300"
          />
          {invalidLink && (
            <small className="text-red-600">Please insert a valid link</small>
          )}
        </>
      ) : (
        <a
          href={selectedEditLink}
          target="_blank"
          className="flex items-center text-3xl uppercase gap-2 hover:text-blue-600 w-fit transition-all"
        >
          <h3 contentEditable={editMode}>
            {selectedEditTitle}
          </h3>
          <BiLinkExternal size={14} />
        </a>
      )}
      <div className="flex justify-between">
        <small className="text-gray-600 uppercase">
          by{" "}
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(job.company),
            }}
            id="editJobCompany"
            contentEditable={editMode}
            className={editMode ? "border-0 border-b-2 border-gray-300" : ""}
          />
        </small>
        <small className="text-gray-500">Added: {job.date}</small>
      </div>
      {editMode ? (
        <select
          id="editJobStatus"
          onChange={() =>
            setSelectedEditStatus(
              document.getElementById("editJobStatus")?.value
            )
          }
          className={`bg-gray-800 text-xs italic w-fit pb-3 pt-2 ${textColorVariants[selectedEditStatus]}`}
          defaultValue={selectedEditStatus}
        >
          <option value="success" className="success-text-style">
            Success
          </option>
          <option value="rejected" className="rejected-text-style">
            Rejected
          </option>
          <option value="processing" className="processing-text-style">
            Processing
          </option>
          <option value="applied" className="applied-text-style">
            Applied
          </option>
          <option value="later" className="later-text-style">
            Save for later
          </option>
        </select>
      ) : (
        <small className={`${textColorVariants[selectedEditStatus]} pb-3`}>
          {selectedEditStatus}
        </small>
      )}
      <hr />
      <div className="relative z-0 w-full">
        <h4 className="text-xl uppercase underline pt-4">Description</h4>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(job.description),
          }}
          id="editJobDescription"
          contentEditable={editMode}
          className={`${
            editMode ? editable : nonEditable
          } pb-8 whitespace-pre-line`}
        />
      </div>
      <div className="relative z-0 w-full">
        <h4 className="text-xl uppercase underline">Requirements</h4>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(job.requirements),
          }}
          id="editJobRequirements"
          contentEditable={editMode}
          className={`${
            editMode ? editable : nonEditable
          } pb-8 whitespace-pre-line`}
        />
        {job.extra && (
          <>
            <h4 className="text-xl uppercase underline">Ex2tras</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(job.extra),
              }}
              id="editJobExtra"
              contentEditable={editMode}
              className={`${
                editMode ? editable : nonEditable
              } whitespace-pre-line`}
            />
          </>
        )}
      </div>
      <div className="flex justify-between pt-8">
        {editMode ? (
          <button
            onClick={() => handleUpdate()}
            className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg focus:ring-4 hover:bg-green-800 bg-green-900 focus:ring-green-800"
          >
            Done <AiOutlineCheck />
          </button>
        ) : (
          <button
            onClick={() => setEditMode((current) => !current)}
            className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg focus:ring-4 hover:bg-blue-800 bg-blue-900 focus:ring-blue-800"
          >
            Edit <AiFillEdit />
          </button>
        )}
        {!editMode && (
          <button
            onClick={() => handleDeleteJobOnModal(job.id)}
            className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-red-800 focus:ring-4 bg-red-900 focus:ring-red-800"
          >
            Delete <HiOutlineTrash />
          </button>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
