// ================================================================================ //
// ================================ IMPORTS ======================================= //
// ================================================================================ //

// ========== Custom components =================================================== //

import Form from "../../components/Form/Form";

// ================================================================================ //
// ================================= COMPONENT ==================================== //
// ================================================================================ //

const Home = () => {
  // ========== Return ============================================================== //

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-3 w-full h-screen">
      <div className="relative hidden md:block col-start-1 col-end-3">
        <img
          className="h-full object-cover object-center"
          src="https://i.imgur.com/twBcBWA.jpg"
        />
        <div className="absolute h-full w-full  backdrop-blur-sm inset-0 grid place-content-center">
          <div className="absolute w-full h-full bg-black opacity-75 -z-10"></div>
          <h1 className="text-5xl">Job Vault</h1>
          <p>
            Welcome to Job Vault, the page that stores and manages all of your
            job applications.
          </p>
        </div>
      </div>
      <div className="md:col-start-3">
        <Form />
      </div>
    </div>
  );
};

export default Home;
