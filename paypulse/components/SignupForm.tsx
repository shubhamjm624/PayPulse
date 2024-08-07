// app/components/SignupForm.tsx
import Link from "next/link";
import { useState } from "react";

interface SignUpFormProps {
  signUpWithEmail: (data: {
    emailAddress: string;
    password: string;
    username: string; // Updated field name
    role: string;
    address?: string;
    phone?: string;
    position?: string;
    company?: string;
  }) => void;
  clerkError: string;
}

const SignupForm = ({ signUpWithEmail, clerkError }: SignUpFormProps) => {
  const [formState, setFormState] = useState({
    emailAddress: "",
    password: "",
    username: "", // Updated field name
    role: "",
    address: "",
    phone: "",
    position: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`handleChange - name: ${name}, value: ${value}`);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit - formState:", formState);
    signUpWithEmail(formState);
  };

  return (
    <div className="flex justify-center mt-12 md:mt-20">
      <div className="w-full max-w-md p-6 bg-black rounded-lg shadow-lg md:max-w-lg">
        <h1 className="mb-6 text-3xl font-semibold text-white">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="emailAddress"
            className="w-full px-3 py-2 text-sm text-white bg-black border-b-2 border-gray-700 focus:border-white focus:outline-none placeholder-gray-400"
            placeholder="Email address"
            type="email"
            required
            value={formState.emailAddress}
            onChange={handleChange}
          />
          <input
            name="password"
            className="w-full px-3 py-2 text-sm text-white bg-black border-b-2 border-gray-700 focus:border-white focus:outline-none placeholder-gray-400"
            placeholder="Password"
            type="password"
            required
            value={formState.password}
            onChange={handleChange}
          />
          <input
            name="username" // Updated field name
            className="w-full px-3 py-2 text-sm text-white bg-black border-b-2 border-gray-700 focus:border-white focus:outline-none placeholder-gray-400"
            placeholder="Username" // Updated placeholder
            type="text"
            value={formState.username}
            onChange={handleChange}
          />
          <select
            name="role"
            className="w-full px-3 py-2 text-sm text-white bg-black border-b-2 border-gray-700 focus:border-white focus:outline-none placeholder-gray-400"
            required
            value={formState.role}
            onChange={handleChange}
          >
            <option value="" disabled>Select role</option>
            <option value="Employee">Employee</option>
            <option value="Employer">Employer</option>
          </select>
          <input
            name="address"
            className="w-full px-3 py-2 text-sm text-white bg-black border-b-2 border-gray-700 focus:border-white focus:outline-none placeholder-gray-400"
            placeholder="Address (use map utility)"
            type="text"
            value={formState.address}
            onChange={handleChange}
          />
          <input
            name="phone"
            className="w-full px-3 py-2 text-sm text-white bg-black border-b-2 border-gray-700 focus:border-white focus:outline-none placeholder-gray-400"
            placeholder="Phone (e.g., +91 95798 20828)"
            type="text"
            value={formState.phone}
            onChange={handleChange}
          />
          <input
            name="position"
            className="w-full px-3 py-2 text-sm text-white bg-black border-b-2 border-gray-700 focus:border-white focus:outline-none placeholder-gray-400"
            placeholder="Position"
            type="text"
            value={formState.position}
            onChange={handleChange}
          />
          <input
            name="company"
            className="w-full px-3 py-2 text-sm text-white bg-black border-b-2 border-gray-700 focus:border-white focus:outline-none placeholder-gray-400"
            placeholder="Company"
            type="text"
            value={formState.company}
            onChange={handleChange}
          />
          {clerkError && <p className="text-sm text-red-500">{clerkError}</p>}
          <button
            className="w-full px-4 py-2 text-sm font-medium text-black bg-white rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            type="submit"
          >
            Create an account
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?
          <Link className="ml-1 text-white hover:underline" href="/sign-in">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
