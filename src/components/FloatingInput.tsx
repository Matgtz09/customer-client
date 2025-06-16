import React from "react";

type FloatingInputProps = {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

const FloatingInput: React.FC<FloatingInputProps> = ({
  name,
  label,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div className="relative w-full h-14">
      <input
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        type={type}
        className={`peer w-full border border-gray-300 rounded px-3 pt-5 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500`}
        placeholder={label}
      />
      <label
        htmlFor={name}
        className={`absolute left-3 top-2 text-gray-500 text-sm transition-all duration-200 
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
          peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500`}
      >
      </label>
      {label}
    </div>
  );
};

export default FloatingInput;