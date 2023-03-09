// ================================================================================ //
// ================================ IMPORTS ======================================= //
// ================================================================================ //

// ========== Main imports ======================================================== //

import { useState, useEffect } from "react";

// ========== Package components ================================================== //

import { useLocation } from "wouter";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

// ========== Custom components =================================================== //

import Navbar from "../../components/Navbar/Navbar";
import Profile from "../../components/Profile/Profile";
import JobCard from "../../components/JobCard/JobCard";
import AddJob from "../../components/AddJob/AddJob";
import JobDetails from "../../components/JobDetails/JobDetails";
import PopUpModal from "../../components/PopUpModal/PopUpModal";

// ========== Interfaces ========================================================== //

import {
  JobInterface,
  UserDataInterface,
} from "../../interfaces/jobsInterfaces";

// ========== Helpers ============================================================= //

import {
  axios_JOBS_addData,
  axios_JOBS_deleteData,
  axios_JOBS_getData,
  axios_JOBS_updateData,
} from "../../helpers/requests";
import { notifyErrorWithToast } from "../../helpers/errors";

// ================================================================================ //
// ================================= COMPONENT ==================================== //
// ================================================================================ //

const Dashboard = () => {
  // ========== Hooks ============================================================== //

  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [tokenInLocalStorage, setTokenInLocalStorage] = useState("");
  const [jobDetailsModalComponent, setJobDetailsModalComponent] =
    useState<Boolean>(true);
  const [userTabOpened, setUserTabOpened] = useState<Boolean>(false);
  const [jobsFromDB, setJobsFromDB] = useState<Array<JobInterface>>([]);
  const [jobForDetails, setJobForDetails] = useState<JobInterface>();
  const [profileInfo, setProfileInfo] = useState<UserDataInterface>();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useLocation();
  const [jobsContainer] = useAutoAnimate();

  // ========== Functions ============================================================== //

  // Get the auth item from the local storage or redirect to the main login page

  !JSON.parse(localStorage.getItem("auth")!) && setLocation("/");

  // Confirmation toast for delete

  const confirmDelete = (jobID: string, closeModal?: boolean) => {
    toast(
      () => (
        <span className="flex flex-col gap-3">
          Do you want to delete this job?
          <div className="flex justify-center items-center gap-3">
            <button
              className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-blue-800 focus:ring-4 bg-blue-900 focus:ring-blue-800"
              onClick={() => toast.dismiss("confirmDeleteJobToast")}
            >
              Cancel
            </button>
            <button
              className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-red-800 focus:ring-4 bg-red-900 focus:ring-red-800"
              onClick={() => {
                toast.dismiss("confirmDeleteJobToast");
                handleDeleteJob(jobID);
                closeModal && controlModal();
              }}
            >
              Delete
            </button>
          </div>
        </span>
      ),
      {
        duration: 99999999,
        id: "confirmDeleteJobToast",
        style: {
          backgroundColor: "#1f2937",
          borderRadius: "0.375rem",
          padding: "2rem",
          maxWidth: "64rem",
          color: "#FFFFFF",
          width: "fit-content",
        },
      }
    );
  };

  // Controls the modal window

  const controlModal = (jobDetails?: boolean, id?: string) => {
    setOpenModal((current) => !current); // Toggle the boolean value
    setJobDetailsModalComponent(jobDetails as boolean); // Set the status of the modal for details
    setJobForDetails(jobsFromDB.find((job) => job.id === id)); // Set the job for details
  };

  // Controls the profile tab

  const controlUserTab = () => {
    setUserTabOpened((current) => !current);
  };

  // Hide the warning for guest accounts

  const hideWarning = () => {
    document.getElementById("warningGuest")!.classList.add("hidden");
  };

  // Delete a job from the database and local array of jobs

  const handleDeleteJob = async (jobID: string) => {
    if (tokenInLocalStorage === "guest") {
      const arrayWithDeletedJob = jobsFromDB.filter((job) => job.id !== jobID);
      setJobsFromDB(jobsFromDB.filter((job) => job.id !== jobID)); // Delete jobs in the local array
      localStorage.setItem("guestJobs", JSON.stringify(arrayWithDeletedJob)); // Save array in local storage
      toast.success("Job deleted successfully!", {
        style: { backgroundColor: "#1F2937", color: "#FFFFFF" },
      });
    } else {
      try {
        await axios_JOBS_deleteData(jobID, "jobs"); // Delete job in the database

        setJobsFromDB(jobsFromDB.filter((job) => job.id !== jobID)); // Delete jobs in the local array
      } catch (err) {
        // Notify the error with the handler

        notifyErrorWithToast(
          "Error deleting job, please try again later",
          err!
        );
      }
    }
  };

  // Update a job from the database and the local array of jobs

  const handleUpdateJob = (id: string, jobForUpdate: JobInterface) => {
    if (tokenInLocalStorage === "guest") {
      jobsFromDB[jobsFromDB.findIndex((job) => job.id === id)] = jobForUpdate; // Update the job in the local array of jobs
      localStorage.setItem("guestJobs", JSON.stringify(jobsFromDB)); // Save array in local storage
      toast.success("Job updated successfully!", {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    } else {
      try {
        axios_JOBS_updateData(jobForUpdate, "jobs"); // Update the job data
        jobsFromDB[jobsFromDB.findIndex((job) => job.id === id)] = jobForUpdate; // Update the job in the local array of jobs
      } catch (err) {
        // Notify the error with the handler

        notifyErrorWithToast("Error editing job, please try again later", err!);
      }
    }
  };

  // Get jobs from the database and save them to the local array of jobs

  const getJobsFromDatabase = async () => {
    if (localStorage.getItem("token")! === "guest") {
      const guestJobsInLocalStorage = localStorage.getItem("guestJobs");
      guestJobsInLocalStorage
        ? setJobsFromDB(JSON.parse(guestJobsInLocalStorage))
        : localStorage.setItem("guestJobs", JSON.stringify([]));
    } else {
      try {
        const userData: UserDataInterface = await axios_JOBS_getData(
          "jobs",
          localStorage.getItem("token")! // Get the token from the local storage
        );

        setJobsFromDB(userData?.jobs); // Save the jobs in state
        setProfileInfo(userData); // Save the profile information
      } catch (err) {
        // Notify the error with the handler

        notifyErrorWithToast(
          "Error getting jobs from database, please try again later",
          err!
        );
      }
    }
  };

  // Creates and saves jobs on the database and local array of jobs

  const handleAddJob = async (data: JobInterface) => {
    // Format the time with INTL

    const timeFormat = new Intl.DateTimeFormat("en-us", {
      dateStyle: "short",
    });

    // Creates the new job

    const dataToAdd = {
      ...data, // Grab the data from the form
      date: timeFormat.format(new Date()), // Add the date formatted with the function
      id: uuidv4(), // Creates an unique id with uuid
    };

    if (tokenInLocalStorage === "guest") {
      jobsFromDB.push(dataToAdd); // Add the job to the local job array
      localStorage.setItem("guestJobs", JSON.stringify(jobsFromDB)); // Save array in local storage
      toast.success("Job saved successfully!", {
        style: { backgroundColor: "#1F2937", color: "#FFFFFF" },
      });
    } else {
      try {
        // Add a toast to the response of the request

        await toast.promise(
          axios_JOBS_addData(
            dataToAdd,
            "jobs" // Path to the back end
          ),
          {
            loading: "Loading...",
            success: "Job added successfully",
            error: "Error adding job, please try again later", // Handle the error message for the popup
          },
          {
            style: { backgroundColor: "#1F2937", color: "#FFFFFF" }, // And the styles
          }
        );

        jobsFromDB.push(dataToAdd); // Add the job to the local job array
      } catch (err) {
        // Notify the error with the handler

        notifyErrorWithToast("Error adding job, please try again later", err!);
      }
    }
  };

  // ========== useEffects ============================================================== //

  useEffect(() => {
    setTokenInLocalStorage(localStorage.getItem("token")!);
    getJobsFromDatabase();
  }, []);

  // ========== Return ============================================================== //

  return (
    <>
      <Navbar
        controlUserTab={controlUserTab}
        userEmail={profileInfo?.email!}
        userType={tokenInLocalStorage}
      />
      {tokenInLocalStorage == "guest" && (
        <div
          id="warningGuest"
          className="flex bg-red-600 text-white px-8 py-1 justify-between"
        >
          <p>
            You're using this app without an account, your jobs will be saved
            ONLY in this device.
          </p>
          <button onClick={hideWarning} className="w-fit self-start">
            <IoCloseSharp size={25} color="white" />
          </button>
        </div>
      )}
      <div className="relative md:w-1/2 md:mx-auto mx-8 mt-2">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          className="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 w-full"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="absolute right-2 bottom-4">
          <FiSearch />
        </span>
      </div>
      <div className="relative">
        <div
          className="p-8 flex flex-wrap gap-4 w-full items-stretch"
          ref={jobsContainer}
        >
          {jobsFromDB &&
            jobsFromDB
              .filter((job) => {
                return searchQuery.toLowerCase() === ""
                  ? job
                  : job.title.toLowerCase().includes(searchQuery);
              })
              .map((job, i) => (
                <JobCard
                  key={i}
                  job={job}
                  functionModal={controlModal}
                  deleteJobFunction={confirmDelete}
                />
              ))}
          {jobsFromDB.length === 0 && (
            <div className="h-full w-screen grid place-content-center">
              <h2 className="text-xl">
                No saved jobs yet :c <br /> Click + to add a job
              </h2>
            </div>
          )}
        </div>
        <button
          onClick={() => controlModal(false)}
          className="fixed bottom-4 right-4 h-10 w-10 rounded-full bg-main text-2xl transition-all border border-white flex justify-center items-center"
        >
          <IoMdAdd color="white" />
        </button>
        <AnimatePresence>
          {userTabOpened && (
            <Profile
              userInfo={profileInfo!}
              controlUserTab={controlUserTab}
              userType={tokenInLocalStorage}
            />
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {openModal ? (
          <PopUpModal modalControls={controlModal}>
            {jobDetailsModalComponent ? (
              <JobDetails
                job={jobForDetails!}
                deleteJobFunction={confirmDelete}
                updateJobFunction={handleUpdateJob}
              />
            ) : (
              <AddJob addJobFunction={handleAddJob} />
            )}
          </PopUpModal>
        ) : null}
      </AnimatePresence>
      <Toaster />
    </>
  );
};

export default Dashboard;
