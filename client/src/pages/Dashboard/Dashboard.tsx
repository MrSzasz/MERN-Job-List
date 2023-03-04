import { IoMdAdd } from "react-icons/io";
import JobCard from "../../components/JobCard/JobCard";
import Navbar from "../../components/Navbar/Navbar";
import PopUpModal from "../../components/PopUpModal/PopUpModal";
import AddJob from "../../components/AddJob/AddJob";
import JobDetails from "../../components/JobDetails/JobDetails";
import { JobInterface } from "../../interfaces/jobsInterfaces";
import { useState, useEffect } from "react";
import Profile from "../../components/Profile/Profile";
import {
  axios_JOBS_addData,
  axios_JOBS_deleteData,
  axios_JOBS_getData,
  axios_JOBS_updateData,
} from "../../helpers/requests";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "wouter";
import { v4 as uuidv4 } from "uuid";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [jobDetailsModalComponent, setJobDetailsModalComponent] =
    useState(true);
  const [userTabOpened, setUserTabOpened] = useState(false);
  const [jobsFromDB, setJobsFromDB] = useState<Array<JobInterface>>([]);
  const [jobForDetails, setJobForDetails] = useState<JobInterface>({});
  const [profileInfo, setProfileInfo] = useState([]);

  const [location, setLocation] = useLocation();

  !JSON.parse(localStorage.getItem("auth")) && setLocation("/");

  const [jobsContainer] = useAutoAnimate();

  const controlModal = (jobDetails?: boolean, id?) => {
    setOpenModal((current) => !current);
    setJobDetailsModalComponent(jobDetails);
    setJobForDetails(jobsFromDB.find((job) => job.id === id));
  };

  const controlUserTab = () => {
    setUserTabOpened((current) => !current);
  };

  // Delete a job from the database and local array of jobs

  const handleDeleteJob = async (jobID: string) => {
    try {
      await axios_JOBS_deleteData(jobID, "jobs"); // Delete job in the database

      setJobsFromDB(jobsFromDB.filter((job) => job.id !== jobID)); // Delete jobs in the local array
    } catch (err) {
      toast.error("Error deleting job, please try again later"); // We catch the error and show the error message
      console.log(err);
    }
  };

  const handleUpdateJob = (id, jobForUpdate) => {
    try {
      axios_JOBS_updateData(jobForUpdate, "jobs");
      jobsFromDB[jobsFromDB.findIndex((job) => job.id === id)] = jobForUpdate;
    } catch (err) {
      toast.error("Error editing job, please try again later"); // We catch the error and show the error message
      console.log(err);
    }
  };

  // Get jobs from the database

  const getJobsFromDatabase = async () => {
    const userData = await axios_JOBS_getData(
      "jobs",
      localStorage.getItem("token") // Get the token from the local storage
    );

    // Save the jobs in state

    console.log(userData);
    setJobsFromDB(userData.jobs);
    setProfileInfo(userData);
  };

  const timeFormat = new Intl.DateTimeFormat("en-us", {
    dateStyle: "short",
  });

  const handleAddJob = async (data: JobInterface) => {
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
      toast.error("Error adding job, please try again later"); // We catch the error and show the error message
      console.log(err);
    }
  };

  useEffect(() => {
    getJobsFromDatabase();
  }, []);

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
              // <div>{console.log(job)}</div>
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
    </>
  );
};

export default Dashboard;
