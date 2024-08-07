"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import SignupForm from "@/components/SignupForm";
import VerifyForm from "@/components/VerifyForm";

const Signup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [clerkError, setClerkError] = useState("");
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");

  const signUpWithEmail = async ({
    emailAddress,
    password,
    name,
    role,
    address,
    phone,
    position,
    company,
  }: {
    emailAddress: string;
    password: string;
    name: string;
    role: string;
    address?: string | undefined;
    phone?: string | undefined;
    position?: string | undefined;
    company?: string | undefined;
  }) => {
    console.log("signUpWithEmail called with:", { emailAddress, password, name, role, address, phone, position, company });

    if (!isLoaded) {
      console.log("isLoaded is false");
      return;
    }

    try {
      console.log("Calling signUp.create...");
      await signUp.create({
        emailAddress,
        password,
      });
      console.log("signUp.create successful");

      console.log("Preparing email address verification...");
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      console.log("Email address verification prepared");

      console.log("Setting verifying to true");
      setVerifying(true);
    } catch (err: any) {
      console.log("Error in signUpWithEmail:", err);
      setClerkError(err.errors[0].message);
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    console.log("handleVerify called with code:", code);

    if (!isLoaded) {
      console.log("isLoaded is false");
      return;
    }

    try {
      console.log("Attempting email address verification...");
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      console.log("Email address verification result:", completeSignUp);

      if (completeSignUp.status !== "complete") {
        console.log("Sign up not complete:", JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        console.log("Sign up complete, setting active session...");
        await setActive({ session: completeSignUp.createdSessionId });
        console.log("Session set, redirecting to home");
        router.push("/");
      }
    } catch (err) {
      console.log("Error in handleVerify:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      {!verifying ? (
        <SignupForm signUpWithEmail={signUpWithEmail} clerkError={clerkError} />
      ) : (
        <VerifyForm handleVerify={handleVerify} code={code} setCode={setCode} />
      )}
    </>
  );
};

export default Signup;
