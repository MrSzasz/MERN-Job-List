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
  const [jobDetailsModalComponent, setJobDetailsModalComponent] =
    useState<Boolean>(true);
  const [userTabOpened, setUserTabOpened] = useState<Boolean>(false);
  const [jobsFromDB, setJobsFromDB] = useState<Array<JobInterface>>([]);
  const [jobForDetails, setJobForDetails] = useState<JobInterface>();
  const [profileInfo, setProfileInfo] = useState<UserDataInterface>();
  const [location, setLocation] = useLocation();
  const [jobsContainer] = useAutoAnimate();

  // ========== Functions ============================================================== //

  // Get the auth item from the local storage or redirect to the main login page

  !JSON.parse(localStorage.getItem("auth")!) && setLocation("/");

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

  // Delete a job from the database and local array of jobs

  const handleDeleteJob = async (jobID: string) => {
    try {
      await axios_JOBS_deleteData(jobID, "jobs"); // Delete job in the database

      setJobsFromDB(jobsFromDB.filter((job) => job.id !== jobID)); // Delete jobs in the local array
    } catch (err) {
      // Notify the error with the handler

      notifyErrorWithToast("Error deleting job, please try again later", err!);
    }
  };

  // Update a job from the database and the local array of jobs

  const handleUpdateJob = (id: string, jobForUpdate: JobInterface) => {
    try {
      axios_JOBS_updateData(jobForUpdate, "jobs"); // Update the job data
      jobsFromDB[jobsFromDB.findIndex((job) => job.id === id)] = jobForUpdate; // Update the job in the local array of jobs
    } catch (err) {
      // Notify the error with the handler

      notifyErrorWithToast("Error editing job, please try again later", err!);
    }
  };

  // Get jobs from the database and save them to the local array of jobs

  const getJobsFromDatabase = async () => {
    try {
      const userData: UserDataInterface = await axios_JOBS_getData(
        "jobs",
        localStorage.getItem("token")! // Get the token from the local storage
      );

      setJobsFromDB(userData.jobs); // Save the jobs in state
      setProfileInfo(userData); // Save the profile information
    } catch (err) {
      // Notify the error with the handler

      notifyErrorWithToast(
        "Error getting jobs from database, please try again later",
        err!
      );
    }
  };

  // Creates and saves jobs on the database and local array of jobs

  const handleAddJob = async (data: JobInterface) => {
    // Format the time with INTL

    const timeFormat = new Intl.DateTimeFormat("en-us", {
      dateStyle: "short",
    });

    try {
      // Creates the new job

      const dataToAdd = {
        ...data, // Grab the data from the form
        date: timeFormat.format(new Date()), // Add the date formatted with the function
        id: uuidv4(), // Creates an unique id with uuid
      };

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
  };

  // ========== useEffects ============================================================== //

  useEffect(() => {
    getJobsFromDatabase();
  }, []);

  // ========== Return ============================================================== //

  return (
    <>
      <Navbar controlUserTab={controlUserTab} userEmail={profileInfo?.email} />
      <div className="relative">
        <div
          className="p-8 flex flex-wrap gap-4 w-full items-stretch"
          ref={jobsContainer}
        >
          {jobsFromDB ? (
            jobsFromDB.map((job, i) => (
              <JobCard
                key={i}
                job={job}
                functionModal={controlModal}
                deleteJobFunction={handleDeleteJob}
              />
            ))
          ) : (
            <div className="h-full w-screen grid place-content-center">
              <h2>No saved jobs yet :c</h2>
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
            <Profile userInfo={profileInfo} controlUserTab={controlUserTab} />
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {openModal ? (
          <PopUpModal modalControls={controlModal}>
            {jobDetailsModalComponent ? (
              <JobDetails
                functionModal={controlModal}
                job={jobForDetails}
                deleteJobFunction={handleDeleteJob}
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
