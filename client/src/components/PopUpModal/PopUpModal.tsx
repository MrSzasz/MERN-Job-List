import { GrFormClose } from "react-icons/gr";

const PopUpModal = ({ children }) => {
  return (
    <div className="fixed w-screen min-h-screen h-fit py-8 grid place-content-center z-10 inset-0">
      <div className="absolute inset-0 w-full h-full bg-black opacity-75 -z-10"></div>
      <div className="relative bg-gray-800 rounded-md p-8 max-w-5xl max-h-[75%]">
        <button className="absolute top-4 right-4 z-10">
          <GrFormClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopUpModal;
