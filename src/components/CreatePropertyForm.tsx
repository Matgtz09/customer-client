import { useState } from "react";
import { API_BASE_URL } from "../config";
import FloatingInput from "./FloatingInput";
import { useNavigate } from "react-router-dom";

const CreatePropertyForm = () => {
  const [formData, setFormData] = useState({
    address: "",
    purchase_price: "",
    gross_income: "",
    total_expenses: "",
    total_units: "",
    year_built: "",
    square_footage: "",
    // rent roll–related
    unit_mix: [{ type: "", count: "" }],
    vacancy_count: "",
    vacancy_rate: "",
    avg_rent_by_type: [{ type: "", average_rent: "" }],
  });

  const [omFile, setOmFile] = useState<File | null>(null);
  const [t12File, setT12File] = useState<File | null>(null);
  const [rentRollFile, setRentRollFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setter(file);
    };

  const updateUnitMixField = (index: number, field: string, value: string) => {
    const updated = [...formData.unit_mix];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, unit_mix: updated }));
  };

  const updateAvgRentField = (index: number, field: string, value: string) => {
    const updated = [...formData.avg_rent_by_type];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, avg_rent_by_type: updated }));
  };

  const handleParseFiles = async () => {
    const data = new FormData();
    if (omFile) data.append("om", omFile, omFile.name);
    if (t12File) data.append("t12", t12File, t12File.name);
    if (rentRollFile) data.append("rent_roll", rentRollFile, rentRollFile.name);

    try {
      const res = await fetch(`${API_BASE_URL}/v1/properties/upload`, {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      const parsed = json.parsed || {};

      setFormData((prev) => ({
        ...prev,
        address: parsed.address || prev.address,
        purchase_price: parsed.purchase_price?.toString() || prev.purchase_price,
        gross_income: parsed.gross_income?.toString() || prev.gross_income,
        total_expenses: parsed.total_expenses?.toString() || prev.total_expenses,
        total_units: parsed.total_units?.toString() || prev.total_units,
        year_built: parsed.year_built?.toString() || prev.year_built,
        square_footage: parsed.square_footage?.toString() || prev.square_footage,
        vacancy_count: parsed.vacancy_count?.toString() || prev.vacancy_count,
        vacancy_rate: parsed.vacancy_rate?.toString() || prev.vacancy_rate,
        unit_mix: Array.isArray(parsed.unit_mix)
          ? parsed.unit_mix
          : prev.unit_mix,
        avg_rent_by_type: Array.isArray(parsed.avg_rent_by_type)
          ? parsed.avg_rent_by_type
          : prev.avg_rent_by_type,
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
        address: formData.address,
        purchase_price: formData.purchase_price,
        gross_income: formData.gross_income,
        total_expenses: formData.total_expenses,
        total_units: formData.total_units,
        year_built: formData.year_built,
        square_footage: formData.square_footage,
        vacancy_count: formData.vacancy_count,
        vacancy_rate: formData.vacancy_rate,
        unit_mix: formData.unit_mix,
        avg_rent_by_type: formData.avg_rent_by_type,
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/v1/properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to create property");

      const createdProperty = await response.json();
      navigate(`/properties/${createdProperty.id}`);
    } catch (error) {
      console.error("Create property failed:", error);
      alert("Failed to create property. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold">Upload Documents</h2>

      {/* ---- File Upload Section ---- */}
      <div className="space-y-2">
        <label className="block">
          Offering Memorandum (OM):
          <input type="file" accept=".csv, .pdf, .xls, .xlsx" onChange={handleFileChange(setOmFile)} />
        </label>
        <label className="block">
          T-12:
          <input type="file" accept=".csv, .pdf, .xls, .xlsx" onChange={handleFileChange(setT12File)} />
        </label>
        <label className="block">
          Rent Roll:
          <input type="file" accept=".csv, .pdf, .xls, .xlsx" onChange={handleFileChange(setRentRollFile)} />
        </label>
      </div>

      <button
        type="button"
        onClick={handleParseFiles}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Parse & Prefill
      </button>

      {/* ---- Form Fields ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <FloatingInput name="address" label="Address" value={formData.address} onChange={handleInputChange} />
        <FloatingInput name="purchase_price" label="Property Purchase Price" type="number" value={formData.purchase_price} onChange={handleInputChange} />
        <FloatingInput name="gross_income" label="Gross Income" type="number" value={formData.gross_income} onChange={handleInputChange} />
        <FloatingInput name="total_expenses" label="Total Expenses" type="number" value={formData.total_expenses} onChange={handleInputChange} />
        <FloatingInput name="total_units" label="Total Units" type="number" value={formData.total_units} onChange={handleInputChange} />
        <FloatingInput name="year_built" label="Year Built" type="number" value={formData.year_built} onChange={handleInputChange} />
        <FloatingInput name="square_footage" label="Square Footage" type="number" value={formData.square_footage} onChange={handleInputChange} />
      </div>

      {/* ---- Unit Mix ---- */}
      <div className="col-span-full space-y-2 mt-4">
        <label className="block font-medium text-gray-700">Unit Mix</label>
        {formData.unit_mix.map((unit, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center gap-2">
            <FloatingInput name={`unit_type_${index}`} label="Unit Type" value={unit.type} onChange={(e) => updateUnitMixField(index, "type", e.target.value)} />
            <FloatingInput name={`unit_count_${index}`} label="Count" type="number" value={unit.count} onChange={(e) => updateUnitMixField(index, "count", e.target.value)} />
            {formData.unit_mix.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const updated = [...formData.unit_mix];
                  updated.splice(index, 1);
                  setFormData((prev) => ({ ...prev, unit_mix: updated }));
                }}
                className="text-red-600 text-sm hover:underline mt-1 md:mt-5"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              unit_mix: [...prev.unit_mix, { type: "", count: "" }],
            }))
          }
          className="text-sm text-blue-600 hover:underline mt-2"
        >
          + Add Unit Type
        </button>
      </div>

      {/* ---- Vacancy Fields ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <FloatingInput name="vacancy_count" label="# of Vacant Units" type="number" value={formData.vacancy_count} onChange={handleInputChange} />
        <FloatingInput name="vacancy_rate" label="Vacancy Rate (%)" type="number" value={formData.vacancy_rate} onChange={handleInputChange} />
      </div>

      {/* ---- Average Rent by Type ---- */}
      <div className="col-span-full space-y-2 mt-4">
        <label className="block font-medium text-gray-700">Average Rent per Unit Type</label>
        {formData.avg_rent_by_type.map((unit, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center gap-2">
            <FloatingInput name={`rent_type_${index}`} label="Unit Type" value={unit.type} onChange={(e) => updateAvgRentField(index, "type", e.target.value)} />
            <FloatingInput name={`avg_rent_${index}`} label="Average Rent" type="number" value={unit.average_rent} onChange={(e) => updateAvgRentField(index, "average_rent", e.target.value)} />
            {formData.avg_rent_by_type.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const updated = [...formData.avg_rent_by_type];
                  updated.splice(index, 1);
                  setFormData((prev) => ({ ...prev, avg_rent_by_type: updated }));
                }}
                className="text-red-600 text-sm hover:underline mt-1 md:mt-5"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              avg_rent_by_type: [...prev.avg_rent_by_type, { type: "", average_rent: "" }],
            }))
          }
          className="text-sm text-blue-600 hover:underline mt-2"
        >
          + Add Rent Type
        </button>
      </div>

      {/* ---- Submit ---- */}
      <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Submit Property
      </button>
    </form>
  );
};

export default CreatePropertyForm;
