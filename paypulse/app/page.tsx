"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import HomeComponent from "@/components/HomeComponent";

export default function Home() {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      {isLoaded && (
        isSignedIn ? (
          <HomeComponent user={user} /> // Send user to HomeComponent
        ) : (
          <div className="flex flex-col items-center justify-center w-full max-w-md sm:max-w-4xl p-6 bg-gray-900 rounded-lg shadow-lg">
            <Image
              src="/logo.png"
              alt="PayPulse Logo"
              width={150}
              height={150}
              className="mb-6"
            />
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to PayPulse</h1>
            <p className="text-base sm:text-lg mb-8">
              Streamline your payroll, contracts, and payments with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-up" className="text-blue-400 hover:underline">
                Sign Up
              </Link>
              <Link href="/sign-in" className="text-blue-400 hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
}
