// app/components/VerifyForm.tsx
import { FormEvent } from "react"

interface VerifyFormProps {
    handleVerify: (e: FormEvent) => void
    code: string
    setCode: (value: string) => void
}

const VerifyForm = ({ handleVerify, code, setCode }: VerifyFormProps) => {
  console.log("VerifyForm rendered with code:", code);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input value changed to:", e.target.value);
    setCode(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with code:", code);
    handleVerify(e);
  };

  return (
    <div className="flex justify-center mt-12 md:mt-20">
      <div className="w-80 md:w-96 bg-black rounded-xl p-6 md:p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-light text-white">
          Verification Code
        </h1>
        <form onSubmit={handleFormSubmit}>
          <input
            value={code}
            className="block w-full mb-4 text-lg bg-transparent border-b-2 border-gray-600 focus:border-white text-white placeholder-gray-400 focus:outline-none"
            id="code"
            name="code"
            placeholder="Enter your code"
            onChange={handleInputChange}
          />
          <button
            className="w-full py-2 text-lg font-medium text-black bg-white rounded-md hover:bg-gray-200 transition duration-300"
            type="submit"
          >
            Complete Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyForm;
