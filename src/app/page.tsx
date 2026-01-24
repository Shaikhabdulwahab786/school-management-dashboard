
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Homepage = () => {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const role = (sessionClaims?.metadata as { role?: string })?.role;
  if (!role) {
    redirect("/select-role");
  }

  redirect(`/${role}`);

  return (
    <div className=''>Homepage</div>
  )
}

export default Homepage