import { useState } from "react";
import { API_BASE_URL } from "../config";

const CreatePropertyForm = () => {
  const [formData, setFormData] = useState({        // Rent Roll
    name: "",               // from OM
    address: "",            // OM or Rent Roll
    purchase_price: "",      // OM
    gross_income: "",        // T-12 or OM
    insurance: "",          // OM
    repairs: "",            // OM
    management_fees: "",     // OM
    utilities: "",          // OM
    number_of_units: "",      // Rent Roll
    unit_mix: "",            // Rent Roll (summary)
    year_built: "",          // OM
    square_footage: "",      // OM
    gross_expenses: "",      // T-12
  });

  const [omFile, setOmFile] = useState<File | null>(null);
  const [t12File, setT12File] = useState<File | null>(null);
  const [rentRollFile, setRentRollFile] = useState<File | null>(null);

  const handleFileChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setter(file);
    };

  const handleParseFiles = async () => {
    const data = new FormData();
    if (omFile) data.append("om", omFile, "om.pdf");
    if (t12File) data.append("t12", t12File, "t12.pdf");
    if (rentRollFile) data.append("rent_roll", rentRollFile, "rent_roll.pdf");

    try {
      const res =await fetch(`${API_BASE_URL}/v1/properties/upload`, {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      const parsed = json.parsed || {};
      const expenses = parsed.expenses || {};

      setFormData((prev) => ({
        ...prev,
        address: parsed.address || prev.address,
        purchase_price: parsed.purchase_price?.toString() || prev.purchase_price,
        number_of_units: parsed.number_of_units?.toString() || prev.number_of_units,
        gross_income: parsed.income?.toString() || prev.gross_income,
        gross_expenses: parsed.gross_expenses?.toString() || prev.gross_expenses,
        year_built: parsed.year_built?.toString() || prev.year_built,
        square_footage: parsed.square_footage?.toString() || prev.square_footage,
        management_fees: expenses.management_fees?.toString() || prev.management_fees,
        utilities: expenses.utilities?.toString() || prev.utilities,
        repairs: expenses.repairs?.toString() || prev.repairs,
        insurance: expenses.insurance?.toString() || prev.insurance,
      }));
    } catch (err) {
      console.error("Failed to parse files", err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      details: {
        name: formData.name,
        address: formData.address,
        purchase_price: formData.purchase_price,
        gross_income: formData.gross_income,
        insurance: formData.insurance,
        repairs: formData.repairs,
        management_fees: formData.management_fees,
        utilities: formData.utilities,
        number_of_units: formData.number_of_units,
        unit_mix: formData.unit_mix,
        year_built: formData.year_built,
        square_footage: formData.square_footage,
        gross_expenses: formData.gross_expenses,
      },
    };

    // Object.entries(formData).forEach(([key, value]) => {
    //   submissionData.append(key, value);
    // });

    // if (omFile) submissionData.append("om", omFile, "om.pdf");
    // if (t12File) submissionData.append("t12", t12File, "t12.pdf");
    // if (rentRollFile) submissionData.append("rent_roll", rentRollFile, "rent_roll.pdf");

    await fetch(`${API_BASE_URL}/v1/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    alert("Property submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold">Upload Documents</h2>

      <div className="space-y-2">
        <label className="block">
          Offering Memorandum (OM):
          <input type="file" accept=".pdf" onChange={handleFileChange(setOmFile)} />
        </label>

        <label className="block">
          T-12:
          <input type="file" accept=".pdf" onChange={handleFileChange(setT12File)} />
        </label>

        <label className="block">
          Rent Roll:
          <input type="file" accept=".pdf" onChange={handleFileChange(setRentRollFile)} />
        </label>
      </div>

      <button
        type="button"
        onClick={handleParseFiles}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Parse & Prefill
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Property Name"
        className="input w-full"
      />
      <input
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Address"
        className="input w-full"
      />
      <input
        name="purchase_price"
        value={formData.purchase_price}
        onChange={handleInputChange}
        placeholder="Purchase Price"
        type="number"
        className="input w-full"
      />
      <input
        name="insurance"
        value={formData.insurance}
        onChange={handleInputChange}
        placeholder="Insurance"
        type="number"
        className="input w-full"
      />
      <input
        name="repairs"
        value={formData.repairs}
        onChange={handleInputChange}
        placeholder="Repairs"
        type="number"
        className="input w-full"
      />
      <input
        name="utilities"
        value={formData.utilities}
        onChange={handleInputChange}
        placeholder="Utilities"
        type="number"
        className="input w-full"
      />
      <input
        name="management_fees"
        value={formData.management_fees}
        onChange={handleInputChange}
        placeholder="Management Fees"
        type="number"
        className="input w-full"
      />
      <input
        name="gross_income"
        value={formData.gross_income}
        onChange={handleInputChange}
        placeholder="Gross Income"
        type="number"
        className="input w-full"
      />
      <input
        name="number_of_units"
        value={formData.number_of_units}
        onChange={handleInputChange}
        placeholder="Number of Units"
        type="number"
        className="input w-full"
      />
      <input
        name="unit_mix"
        value={formData.unit_mix}
        onChange={handleInputChange}
        placeholder="Unit Mix (e.g. 1BR:5, 2BR:3)"
        className="input w-full"
      />
      <input
        name="gross_expenses"
        value={formData.gross_expenses}
        onChange={handleInputChange}
        placeholder="Gross Expenses"
        type="number"
        className="input w-full"
      />
      <input
        name="year_built"
        value={formData.year_built}
        onChange={handleInputChange}
        placeholder="Year Built"
        className="input w-full"
      />
      <input
        name="square_footage"
        value={formData.square_footage}
        onChange={handleInputChange}
        placeholder="Square Footage"
        className="input w-full"
      />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Submit Property
      </button>
    </form>
  );
};

export default CreatePropertyForm;










// import { useState } from "react";

// /*************  ✨ Windsurf Command ⭐  *************/
// /**
//  * Form to create a new property.
//  *
//  * Allows user to upload documents, then uses the API to parse those documents and prefill the form.
//  * Submits the form to the API to create a new property.
//  */
// /*******  b70fa9bc-e7b4-41c3-854d-cbfb57c5d827  *******/
// const CreatePropertyForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     purchase_price: "",
//     number_of_units: "",
//   });

//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files ? Array.from(e.target.files) : [];
//     setUploadedFiles(files);
//   };

//   const handleParseFiles = async () => {
//     const data = new FormData();
//     uploadedFiles.forEach((file) => data.append("files[]", file));

//     try {
//       const res = await fetch("/v1/parse", {
//         method: "POST",
//         body: data,
//       });
//       const parsed = await res.json();

//       // Fill in form with returned fields
//       setFormData((prev) => ({
//         ...prev,
//         address: parsed.address || prev.address,
//         purchasePrice: parsed.purchase_price || prev.purchasePrice,
//         number_of_units: parsed.number_of_units || prev.number_of_units,
//       }));
//     } catch (err) {
//       console.error("Failed to parse files", err);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const submissionData = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       submissionData.append(key, value);
//     });

//     uploadedFiles.forEach((file) => {
//       submissionData.append("files[]", file);
//     });

//     await fetch("/v1/properties", {
//       method: "POST",
//       body: submissionData,
//     });

//     alert("Property submitted!");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold">Upload Documents</h2>

//       <input type="file" multiple onChange={handleFileChange} />

//       <button
//         type="button"
//         onClick={handleParseFiles}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Parse & Prefill
//       </button>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         <input
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           placeholder="Property Name"
//           className="input"
//         />
//         <input
//           name="address"
//           value={formData.address}
//           onChange={handleInputChange}
//           placeholder="Address"
//           className="input"
//         />
//         <input
//           name="purchasePrice"
//           value={formData.purchasePrice}
//           onChange={handleInputChange}
//           placeholder="Purchase Price"
//           type="number"
//           className="input"
//         />
//         <input
//           name="number_of_units"
//           value={formData.number_of_units}
//           onChange={handleInputChange}
//           placeholder="Number of Units"
//           type="number"
//           className="input"
//         />
//       </div>

//       <button
//         type="submit"
//         className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//       >
//         Submit Property
//       </button>
//     </form>
//   );
// };

// export default CreatePropertyForm;
