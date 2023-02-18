import Form from "../../components/Form/Form";

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
      <h1 className="text-red-700">salighakl</h1>
      <img className="md:hidden" src="https://picsum.photos/1920/1280" />
      <div>
        <Form />
      </div>
    </div>
  );
};

export default Home;
