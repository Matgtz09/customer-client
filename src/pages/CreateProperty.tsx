import CreatePropertyForm from "../components/CreatePropertyForm";
import { Link } from "react-router-dom";

const CreateProperty = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">

     <Link to="/properties" className="text-blue-600 hover:underline mb-4 inline-block">
      &larr; Back to Properties
    </Link>

    <div className="max-w-4xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Property</h1>
      <CreatePropertyForm />
    </div>
  </div>
  );
};

export default CreateProperty;