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
  axios_addData,
  axios_deleteData,
  axios_getData,
} from "../../helpers/requests";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState<Boolean>(false);
  const [jobDetailsModalComponent, setJobDetailsModalComponent] =
    useState(true);
  const [userTabOpened, setUserTabOpened] = useState(false);
  const [jobsFromDB, setJobsFromDB] = useState<Array<JobInterface>>([]);
  const [jobForDetails, setJobForDetails] = useState<JobInterface>({});

  const controlModal = (jobDetails?: boolean, id?) => {
    setOpenModal((current) => !current);
    setJobDetailsModalComponent(jobDetails);
    setJobForDetails(jobsFromDB.find((job) => job._id === id));
  };

  const controlUserTab = () => {
    setUserTabOpened((current) => !current);
  };

  const handleDeleteJob = async (jobID) => {
    await axios_deleteData(jobID, "http://localhost:3001/jobs");
    setJobsFromDB(jobsFromDB.filter((job) => job._id !== jobID));
  };

  const getJobsFromDatabase = async () => {
    const jobs = await axios_getData("http://localhost:3001/jobs");
    setJobsFromDB(jobs);
  };

  const timeFormat = new Intl.DateTimeFormat("en-us", {
    dateStyle: "short",
  });

  const handleAddJob = async (data: JobInterface) => {
    // jobsFromDB.push(data);
    try {
      const returnedData = await toast.promise(
        axios_addData(
          { ...data, date: timeFormat.format(new Date()) },
          "http://localhost:3001/jobs"
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
      jobsFromDB.push(returnedData as JobInterface);
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
