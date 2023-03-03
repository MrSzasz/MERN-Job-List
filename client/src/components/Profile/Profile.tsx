import { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { useLocation } from "wouter";
import PopUpModal from "../PopUpModal/PopUpModal";

const Profile = ({ controlUserTab, userInfo }) => {
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [location, setLocation] = useLocation();

  const controlDeleteModal = () => {
    setDeleteAccountModal((current) => !current);
  };

  const handleLogOut = () => {
    // token null
    localStorage.setItem("token", null);
    // auth false
    localStorage.setItem("auth", false);
    // redirect to /
    setLocation("/");
  };

  return (
    <div className="w-screen h-screen md:w-fit md:right-0 top-0 bg-gray-900 fixed z-20">
      <div
        className="absolute h-48 w-full"
        style={{ backgroundColor: userInfo.color }}
      >
        <button
          className="absolute top-4 right-4 z-10"
          onClick={controlUserTab}
        >
          <IoCloseSharp size={25} color="white" />
        </button>
      </div>
      <div className="flex relative flex-col p-8 w-fit h-full justify-evenly">
        <div className="z-20 flex flex-col items-center">
          <div className="h-40 w-40 grid place-content-center bg-gray-900 rounded-full z-10 mb-4">
            <div className="relative h-32 w-32 bg-black rounded-full border-2 border-gray-900 grid place-content-center">
              <div className="h-min w-min inset-0 place-content-center text-7xl uppercase">
                {/* <BsFillPencilFill size={"2em"} /> */}
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
      {deleteAccountModal && (
        <PopUpModal modalControls={controlDeleteModal}>
          <div className="flex flex-col">
            <h3>Delete account</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. A
              repellendus nam ducimus hic animi nemo?
            </p>
            <div className="flex gap-8">
              <button
                onClick={controlDeleteModal}
                className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-blue-800 focus:ring-4 bg-blue-900 focus:ring-blue-800"
              >
                Cancel
              </button>
              <button className="flex w-fit items-center gap-2 hover:gap-3 px-3 py-2 text-sm font-medium text-center text-white transition-all rounded-lg hover:bg-red-800 focus:ring-4 bg-red-900 focus:ring-red-800">
                Delete account
              </button>
            </div>
          </div>
        </PopUpModal>
      )}
    </div>
  );
};

export default Profile;
