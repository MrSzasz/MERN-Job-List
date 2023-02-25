import { IoMdAdd } from "react-icons/io";
import JobCard from "../../components/JobCard/JobCard";
import Navbar from "../../components/Navbar/Navbar";
import PopUpModal from "../../components/PopUpModal/PopUpModal";
import AddJob from "../../components/AddJob/AddJob";
import JobDetails from "../../components/JobDetails/JobDetails";
import { JobInterface } from "../../interfaces/jobsInterfaces";
import { useState, useEffect } from "react";
import Profile from "../../components/Profile/Profile";
import { getDataFromDB } from "../../helpers/requests";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [jobDetailsModalComponent, setJobDetailsModalComponent] =
    useState(true);
  const [userTabOpened, setUserTabOpened] = useState(false);
  const [jobsFromDB, setJobsFromDB] = useState<Array<JobInterface>>([]);
  const [jobForDetails, setJobForDetails] = useState<JobInterface>({});

  const controlModal = (jobDetails: boolean, id) => {
    setOpenModal((current) => !current);
    setJobDetailsModalComponent(jobDetails ? true : false);
    setJobForDetails(jobsFromDB.find((job) => job._id === id));
  };

  const controlUserTab = () => {
    setUserTabOpened((current) => !current);
  };

  const getJobsFromDatabase = async () => {
    const jobs = await getDataFromDB("http://localhost:3001/jobs");
    setJobsFromDB(jobs);
  };

  useEffect(() => {
    getJobsFromDatabase();
  }, []);

  return (
    <>
      <Navbar controlUsetTab={controlUserTab} />
      <div className="grid grid-cols-2 relative">
        <div className="col-end-12 p-8 flex flex-wrap gap-4 w-full">
          {jobsFromDB.length !== 0 ? (
            jobsFromDB.map((job, i) => (
              <JobCard key={i} job={job} functionModal={controlModal} />
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
            <JobDetails job={jobForDetails} />
          ) : (
            <AddJob />
          )}
        </PopUpModal>
      )}
    </>
  );
};

export default Dashboard;
