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

  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
    username: "",
    role: "",
    address: "",
    phone: "",
    position: "",
    company: "",
  });

  const signUpWithEmail = async ({
    emailAddress,
    password,
    username,
    role,
    address = "", // Default to empty string
    phone = "",    // Default to empty string
    position = "", // Default to empty string
    company = "",  // Default to empty string
  }: {
    emailAddress: string;
    password: string;
    username: string;
    role: string;
    address?: string;
    phone?: string;
    position?: string;
    company?: string;
  }) => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        username,
        phoneNumber: phone,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setFormData({
        emailAddress,
        password,
        username,
        role,
        address,
        phone,
        position,
        company,
      });
      setVerifying(true);
    } catch (err: any) {
      setClerkError(err.errors[0].message);
    }
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });

        // Assuming formData contains an `emailAddress` field
        const { emailAddress, username, ...otherData } = formData;

        // Create a new object with `email` instead of `emailAddress`
        const updatedFormData = {
          email: emailAddress,  // Map `emailAddress` to `email`
          name : username,
          ...otherData          // Include the rest of the formData fields
        };

        // here in below fetch request , in formaData , instead of emailAddress , use email
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        });

        if (response.ok) {
          router.push("/");
        } else {
          const errorData = await response.json();
          console.log("Signup not complete, errorData :", JSON.stringify(errorData));
          setClerkError(errorData.message || "Failed to create user in the database.");
        }
      } else {
        console.log("Signup not complete, further action may be needed:", JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2));
      setClerkError("Verification failed. Please try again.");
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
