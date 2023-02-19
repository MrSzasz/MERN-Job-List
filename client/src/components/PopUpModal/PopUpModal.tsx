import { GrFormClose } from "react-icons/gr";

const PopUpModal = () => {
  return (
    <div className="fixed w-screen h-screen grid place-content-center">
      <div className="absolute inset-0 w-full h-full bg-black opacity-75 -z-10"></div>
      <div className="relative bg-gray-800 rounded-md p-8 max-w-5xl">
        <button className="absolute top-4 right-4 z-10">
          <GrFormClose />
        </button>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias,
        quo. Facere quasi aliquam eveniet adipisci aspernatur sed beatae illum
        commodi impedit nostrum odit, necessitatibus voluptates dicta officiis
        molestias voluptas ea?
      </div>
    </div>
  );
};

export default PopUpModal;
