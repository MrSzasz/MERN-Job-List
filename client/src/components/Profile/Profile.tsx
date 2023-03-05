// ================================================================================ //
// ================================ IMPORTS ======================================= //
// ================================================================================ //

// ========== Main imports ======================================================== //

import { useState } from "react";

// ========== Package components ================================================== //

import { useLocation } from "wouter";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FiLogOut } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineClose, MdOutlineDangerous } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

// ========== Custom components =================================================== //

import FormErrors from "../FormErrors/FormErrors";
import PopUpModal from "../PopUpModal/PopUpModal";
import { notifyErrorWithToast } from "../../helpers/errors";

// ========== Interfaces ========================================================== //

import { UserDataInterface } from "../../interfaces/jobsInterfaces";

// ========== Prop types ========================================================== //

type PropsType_Profile = {
  controlUserTab: () => void;
  userInfo: UserDataInterface;
};

// ========== Helpers ============================================================= //

import { axios_USERS_deleteData } from "../../helpers/requests";

// ================================================================================ //
// ================================= COMPONENT ==================================== //
// ================================================================================ //

const Profile = ({ controlUserTab, userInfo }: PropsType_Profile) => {
  // ========== Hooks =============================================================== //

  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [location, setLocation] = useLocation();
  const { register, watch } = useForm();

  // ========== Functions =========================================================== //

  const controlDeleteModal = () => {
    setDeleteAccountModal((current) => !current); // Set the modal for the deletion
  };

  const handleLogOut = () => {
    // token null

    localStorage.setItem("token", JSON.stringify(null));

    // auth false

    localStorage.setItem("auth", JSON.stringify(false));

    // redirect to /

    setLocation("/");
  };

  const handleDeleteRequest = () => {
    try {
      axios_USERS_deleteData(userInfo._id, "users"); // Delete the user
      handleLogOut(); // Redirect to the main login page
    } catch (err) {
      notifyErrorWithToast(
        "Something went wrong deleting your account, please try again later",
        err!
      );
    }
  };

  const handleDeleteAccount = () => {
    userInfo.email === watch("confirmation") && handleDeleteRequest();
  };

  return (
    // ========== Return ============================================================== //

    <motion.div
      initial={{ x: +200, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: {
          ease: "linear",
        },
      }}
      exit={{
        x: +200,
        opacity: 0,
        transition: {
          ease: "linear",
        },
      }}
      className="w-screen h-screen md:w-fit md:right-0 md:border-gray-900 md:border-l-4 top-0 bg-gray-900 fixed z-20"
    >
      <div
        className="absolute md:h-48 w-full bg-main"
        // style={{ backgroundColor: userInfo.color }}
      >
        <button
          className="absolute top-4 right-4 z-10"
          onClick={controlUserTab}
        >
          <IoCloseSharp size={25} color="white" />
        </button>
      </div>
      <div className="flex relative flex-col p-8 md:w-fit h-full justify-evenly items-center">
        <div className="z-20 flex flex-col items-center">
          <div className="h-40 w-40 grid place-content-center bg-gray-900 rounded-full z-10 mb-4">
            <div className="relative h-32 w-32 bg-black rounded-full border-2 border-gray-900 grid place-content-center">
              <div className="h-min w-min inset-0 place-content-center text-7xl uppercase">
                <span>{userInfo.email[0]}</span>
              </div>
            </div>
          </div>
          <h2 className="text-lg">{userInfo.email}</h2>
          <small className="text-gray-600 uppercase w-full">
            Created at: {userInfo.createdAt}
          </small>
        </div>
        <button
          onClick={handleLogOut}
          className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-red-800 focus:ring-4 bg-red-900 focus:ring-red-800"
        >
          Log out <FiLogOut />
        </button>
        <small
          onClick={controlDeleteModal}
          className="text-red-800 underline cursor-pointer absolute bottom-4 m-auto w-fit"
        >
          Delete account
        </small>
      </div>
      <AnimatePresence>
        {deleteAccountModal ? (
          <PopUpModal modalControls={controlDeleteModal}>
            <div className="flex flex-col">
              <div>
                <h3 className="text-3xl underline mb-4">Delete account</h3>
                <p>
                  You'll lose all your saved jobs. Are you sure you want to
                  delete your account?
                </p>
              </div>
              <div className="relative z-0 w-full mb-8 group mt-6">
                <input
                  type="email"
                  {...register("confirmation", {
                    required: true,
                    maxLength: 50,
                  })}
                  id="confirmation"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  maxLength={50}
                />
                <label
                  htmlFor="confirmation"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-[5] origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enter your email for confirmation
                </label>
              </div>

              <div className="flex gap-8">
                <button
                  onClick={controlDeleteModal}
                  className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-blue-800 focus:ring-4 bg-blue-900 focus:ring-blue-800"
                >
                  Cancel
                  <MdOutlineClose />
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={watch("confirmation") !== userInfo.email}
                  className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-900 flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-red-800 focus:ring-4 bg-red-900 focus:ring-red-800"
                >
                  <MdOutlineDangerous />
                  Delete account
                </button>
              </div>
            </div>
          </PopUpModal>
        ) : null}
      </AnimatePresence>
      <Toaster />
    </motion.div>
  );
};

export default Profile;
