import { AiOutlineUser } from "react-icons/ai";
import { Link } from "wouter";

const Navbar = ({controlUserTab, userEmail}) => {
  return (
    <div className="h-16 w-screen bg-main flex justify-between items-center px-8">
      <h2 className="text-3xl">JOB VAULT</h2>
      <div className="flex items-center gap-4 overflow-hidden group/navbar-user">
        <p className="transition-all translate-x-[150%] opacity-0 group-hover/navbar-user:translate-x-[0] group-hover/navbar-user:opacity-100 z-0">
          {userEmail}
        </p>
        <button onClick={controlUserTab} className="z-10 rounded-full border-2 border-white h-10 w-10 grid place-content-center bg-main">
          <AiOutlineUser size={"1.5em"} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
