// ================================================================================ //
// ================================ IMPORTS ======================================= //
// ================================================================================ //

// ========== Package components ================================================== //

import { AiOutlineUser } from "react-icons/ai";

// ========== Prop types ========================================================== //

type PropsType_Navbar = {
  controlUserTab: () => void;
  userEmail: string;
  userType: string;
};

// ================================================================================ //
// ================================= COMPONENT ==================================== //
// ================================================================================ //

const Navbar = ({ controlUserTab, userEmail, userType }: PropsType_Navbar) => {
  // ========== Return ============================================================== //

  return (
    <div className="h-16 w-screen bg-main flex justify-between items-center px-4 md:px-8">
      <h2 className="text-xl md:text-3xl">JOB VAULT</h2>
      <div className="flex items-center md:w-fit gap-4 overflow-hidden group/navbar-user">
        <p className="transition-all md:translate-x-[150%] hidden md:block md:opacity-0 group-hover/navbar-user:translate-x-[0] group-hover/navbar-user:opacity-100 z-0">
          {userType === "guest" ? "Guest" : userEmail}
        </p>
        <button
          onClick={controlUserTab}
          className="z-10 rounded-full border-2 border-white h-10 w-10 grid place-content-center bg-main"
        >
          <AiOutlineUser size={"1.5em"} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
