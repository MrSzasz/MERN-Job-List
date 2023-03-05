// ================================================================================ //
// ================================ IMPORTS ======================================= //
// ================================================================================ //

// ========== Package components ================================================== //

import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";

// ========== Prop types ========================================================== //

type PropsType_PopUpModal = {
  children: React.ReactNode;
  modalControls: () => void;
};

// ================================================================================ //
// ================================= COMPONENT ==================================== //
// ================================================================================ //

const PopUpModal = ({ children, modalControls }: PropsType_PopUpModal) => {
  // ========== Return ============================================================== //

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
      }}
      className="fixed w-screen min-h-screen h-fit py-8 z-[100] inset-0"
      key="popUpModal"
    >
      <div
        onClick={modalControls}
        className="absolute inset-0 w-full h-full bg-black opacity-75 -z-10"
      />
      <motion.div
        initial={{ y: "-100" }}
        animate={{
          y: 0,
          transition: {
            duration: 0.5,
            type: "tween",
          },
        }}
        exit={{
          y: "-100",
        }}
        className="relative bg-gray-800 rounded-md p-8 max-w-5xl md:max-w-3xl m-auto max-h-[90vh] overflow-y-auto w-fit"
      >
        <button className="absolute top-4 right-4 z-10" onClick={modalControls}>
          <IoCloseSharp size={25} color="white" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PopUpModal;
