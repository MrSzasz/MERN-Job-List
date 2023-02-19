import Form from "../../components/Form/Form";

const Home = () => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-3 w-full h-screen">
      <div className="relative hidden md:block col-start-1 col-end-3">
        <img
          className="h-full object-cover object-center"
          src="https://picsum.photos/1920/1280"
        />
        <div className="absolute h-full w-full  backdrop-blur-sm inset-0 grid place-content-center">
          <div className="absolute w-full h-full bg-black opacity-75 -z-10"></div>
          <h1 className="text-5xl">TITLE OF THE PAGE</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, ipsum!
          </p>
        </div>
      </div>
      <div className="col-start-3">
        <Form />
      </div>
    </div>
  );
};

export default Home;
