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

const Dashboard = () => {
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [jobDetailsModalComponent, setJobDetailsModalComponent] =
    useState(true);
  const [userTabOpened, setUserTabOpened] = useState(false);
  const [jobsFromDB, setJobsFromDB] = useState<Array<JobInterface>>([]);
  const [jobForDetails, setJobForDetails] = useState<JobInterface>({});

  const [location, setLocation] = useLocation();

  !JSON.parse(localStorage.getItem("auth")) && setLocation("/");

  const controlModal = (jobDetails?: boolean, id?) => {
    setOpenModal((current) => !current);
    setJobDetailsModalComponent(jobDetails);
    setJobForDetails(jobsFromDB.find((job) => job._id === id));
  };

  const controlUserTab = () => {
    setUserTabOpened((current) => !current);
  };

  const handleDeleteJob = async (jobID) => {
    await axios_JOBS_deleteData(jobID, "jobs");
    setJobsFromDB(jobsFromDB.filter((job) => job._id !== jobID));
  };

  const handleUpdateJob = (id, jobForUpdate) => {
    jobsFromDB[jobsFromDB.findIndex((job) => job._id === id)] = jobForUpdate;
    axios_JOBS_updateData(jobForUpdate, "jobs");
  };

  // Get jobs from the database

  const getJobsFromDatabase = async () => {
    const jobs = await axios_JOBS_getData(
      "jobs",
      localStorage.getItem("token") // Get the token from the local storage
    );

    // Save the jobs in state

    setJobsFromDB(jobs);
  };

  const timeFormat = new Intl.DateTimeFormat("en-us", {
    dateStyle: "short",
  });

  const handleAddJob = async (data: JobInterface) => {
    try {
      await toast.promise(
        axios_JOBS_addData(
          { ...data, date: timeFormat.format(new Date()), id: uuidv4() },
          "jobs"
        ),
        {
          loading: "Loading...",
          success: "Job added successfully",
          error: "Error adding job, please try again later",
        },
        {
          style: { backgroundColor: "#1F2937", color: "#FFFFFF" },
        }
      );
      
      jobsFromDB.push(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getJobsFromDatabase();
  }, []);

  return (
    <>
      <Navbar controlUserTab={controlUserTab} />
      <div className="relative">
        <div className="p-8 flex flex-wrap gap-4 w-full items-stretch">
          {jobsFromDB.length !== 0 ? (
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
        {userTabOpened && <Profile controlUserTab={controlUserTab} />}
      </div>
      {openModal && (
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
      )}
    </>
  );
};

export default Dashboard;
