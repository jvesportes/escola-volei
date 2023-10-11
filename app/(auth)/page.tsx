import { LoginPage } from "@/components/login/login-page";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = false;

  if (user) {
    return redirect("/dashboard");
  }
  return <LoginPage />;
}
