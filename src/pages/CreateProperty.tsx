import CreatePropertyForm from "../components/CreatePropertyForm";

const CreateProperty = () => {
  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Property</h1>
      <CreatePropertyForm />
    </div>
  );
};

export default CreateProperty;