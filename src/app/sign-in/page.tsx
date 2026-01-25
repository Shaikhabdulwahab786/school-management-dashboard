"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Safe role-based redirect
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const role = user?.publicMetadata?.role;

    if (role === "admin") router.replace("/admin");
    else if (role === "teacher") router.replace("/teacher");
    else if (role === "student") router.replace("/student");
    else router.replace("/sign-in");
  }, [isLoaded, isSignedIn, user, router]);

  // ⏳ Prevent UI flicker
  if (!isLoaded) {
    return (
      <div className=" w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn.Root
      >
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="logo" width={24} height={24} />
            Gravity Dashboard
          </h1>

          <h2 className="text-gray-400">Sign in to your account</h2>

          <Clerk.GlobalError className="text-sm text-red-400" />

          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username or Email
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>

          <SignIn.Action
            submit
            disabled={loading}
            className={`bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]
              ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Log in"}
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
