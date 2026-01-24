// app/redirect/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default function RedirectPage() {
  const { sessionClaims } = auth();
  const role =  (sessionClaims?.metadata as { role?: string })?.role;
    console.log(role)
  if (!role) redirect("/sign-in");

  redirect(`/${role}`);
}
