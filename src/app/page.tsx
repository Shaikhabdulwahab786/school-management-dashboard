"use client"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Homepage = () => {
   const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  redirect("/redirect");

  return (
    <div className=''>Homepage</div>
  )
}

export default Homepage