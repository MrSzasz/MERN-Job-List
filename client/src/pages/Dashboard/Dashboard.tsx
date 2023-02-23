import { GrFormAdd } from "react-icons/gr";
import { BsFilter } from "react-icons/bs";
import JobCard from "../../components/JobCard/JobCard";
import Navbar from "../../components/Navbar/Navbar";
import PopUpModal from "../../components/PopUpModal/PopUpModal";
import AddJob from "../../components/AddJob/AddJob";
import JobDetails from "../../components/JobDetails/JobDetails";
import { JobInterface } from "../../interfaces/jobsInterfaces";

const Dashboard = () => {
  const jobs: Array<JobInterface> = [
    {
      title: "dev",
      link: "https://www.linkedin.com/jobs/search/?alertAction=viewjobs&currentJobId=3490778142&f_TPR=a1676746546-&keywords=Desarrollador&savedSearchId=1731042626&searchAlertRefId=e6c55f9d-d904-4c1f-b620-71aab66c5836",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, sit?",
      status: "applied",
      date: "11/11/11",
      company: "Lenovo",
      requirements: "HTML, CSS, JavaScript",
      extra: "lorem ipsum dolor sit amet",
    },
    {
      title: "dev",
      link: "https://ar.indeed.com/jobs?q=front+end&l=&from=searchOnHP&vjk=6b9abcaafff43ecf",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, sit?",
      status: "rejected",
      date: "11/11/11",
      company: "Lenovo",
      requirements: "HTML, CSS, JavaScript",
      extra: "lorem ipsum dolor sit amet",
    },
    {
      title: "dev",
      link: "https://github.com/",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, sit?",
      status: "success",
      date: "11/11/11",
      company: "Lenovo",
      requirements: "HTML, CSS, JavaScript",
      extra: "lorem ipsum dolor sit amet",
    },
    {
      title: "dev",
      link: "https://vercel.com/dashboard",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, sit?",
      status: "rejected",
      date: "11/11/11",
      company: "Lenovo",
      requirements: "HTML, CSS, JavaScript",

      extra: "lorem ipsum dolor sit amet",
    },
    {
      title: "dev",
      link: "https://stackoverflow.com/questions/10282939/how-to-get-favicons-url-from-a-generic-webpage-in-javascript",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, sit?",
      status: "processing",
      date: "11/11/11",
      company: "Lenovo",
      requirements: "HTML, CSS, JavaScript",

      extra: "lorem ipsum dolor sit amet",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="grid grid-cols-2 relative">
        {/* <div className="hidden md:flex col-end-1 min-h-screen h-full w-12 hover:w-20 transition-all bg-main"></div> */}
        <div className="col-end-12 p-8 flex flex-wrap gap-4 w-full">
          {jobs.map((job, i) => (
            <JobCard
              key={i}
              link={job.link}
              title={job.title}
              description={job.description}
            />
          ))}
        </div>
        <div className="fixed bottom-4 right-4 h-10 w-10 rounded-full bg-main text-2xl transition-all border border-white hover:w-fit flex gap-4 px-4 hover:px-4 justify-center items-center group">
          <button className=" hidden group-hover:block">
            <BsFilter />
          </button>
          <button>
            <GrFormAdd color="white" />
          </button>
        </div>
      </main>
      {/* <AddJob /> */}
      <JobDetails />
      {/* <PopUpModal>
        <AddJob />
      </PopUpModal> */}
    </>
  );
};

export default Dashboard;
