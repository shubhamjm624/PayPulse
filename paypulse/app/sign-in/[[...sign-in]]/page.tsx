"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import SigninForm from "@/components/SigninForm";

const Signup = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [clerkError, setClerkError] = useState("");
  const router = useRouter();

  const signInWithEmail = async ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => {
    console.log("signInWithEmail called with:", { emailAddress, password });

    if (!isLoaded) {
      console.log("isLoaded is false");
      return;
    }

    try {
      console.log("Calling signIn.create...");
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });
      console.log("signInAttempt :: ", JSON.stringify(signInAttempt));
      console.log("signIn.create successful");

      // Check if sign-in is complete
      if (signInAttempt.status === "complete") {
        console.log("Sign-in complete, redirecting to homepage...");
        router.push("/"); // Redirect to homepage
      } else {
        console.log("Sign-in not complete, further action might be needed.");
      }
    } catch (err: any) {
      console.log("Error in signInWithEmail:", err);
      setClerkError(err.errors[0].message);
    }
  };

  return (
    <>
      <SigninForm signInWithEmail={signInWithEmail} clerkError={clerkError} />
    </>
  );
};

export default Signup;
