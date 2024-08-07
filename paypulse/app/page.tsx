"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl p-6 bg-gray-900 rounded-lg shadow-lg">
        <Image
          src="/logo.png"
          alt="PayPulse Logo"
          width={150}
          height={150}
          className="mb-6"
        />
        <h1 className="text-4xl font-bold mb-4">Welcome to PayPulse</h1>
        <p className="text-lg mb-8">
          Streamline your payroll, contracts, and payments with ease.
        </p>
        {isLoaded && (
          <>
            {isSignedIn ? (
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl font-semibold mb-4">You are logged in!</h2>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex gap-4">
                <Link href="/sign-up">
                    Sign Up
                </Link>
                <Link href="/sign-in">
                    Sign In
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
