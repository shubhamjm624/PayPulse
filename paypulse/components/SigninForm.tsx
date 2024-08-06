import Link from "next/link";
import { FormEvent } from 'react';

interface SignInFormProps {
  signInWithEmail: ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => void;
  clerkError: string;
}

const SigninForm = ({ signInWithEmail, clerkError }: SignInFormProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-sm bg-gray-800 rounded-lg shadow-lg">
        <div className="p-8">
          <h1 className="mb-6 text-3xl font-semibold text-white">Sign In</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as typeof e.target & {
                email: { value: string };
                password: { value: string };
              };
              const email = target.email.value;
              const password = target.password.value;
              signInWithEmail({ emailAddress: email, password: password });
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Email address</label>
              <input
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md text-white bg-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                placeholder="Email address"
                type="email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md text-white bg-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                placeholder="Password"
                type="password"
                required
              />
            </div>
            {clerkError && (
              <div className="mb-4 text-red-400">
                {clerkError}
              </div>
            )}
            <button
              className="w-full bg-black text-white py-2 rounded-md shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <p className="mt-6 text-sm font-light text-center text-gray-300">
            Don&apos;t have an account?
            <Link className="ml-2 text-white hover:underline" href="/sign-up">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
