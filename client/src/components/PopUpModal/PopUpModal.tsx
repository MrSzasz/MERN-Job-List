import { IoCloseSharp } from "react-icons/io5";

const PopUpModal = ({ children, modalControls }) => {
  return (
    <div className="fixed w-screen min-h-screen h-fit py-8 z-[100] inset-0">
      <div onClick={modalControls} className="absolute inset-0 w-full h-full bg-black opacity-75 -z-10"/>
      <div className="relative bg-gray-800 rounded-md p-8 max-w-5xl md:max-w-3xl m-auto max-h-[90vh] overflow-y-auto w-fit">
        <button className="absolute top-4 right-4 z-10" onClick={modalControls}>
          <IoCloseSharp size={25} color="white"/>
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopUpModal;
