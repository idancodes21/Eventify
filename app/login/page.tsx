import LoginForm from "@/components/auth/login-form";
import Image from "next/image";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-foreground flex flex-col md:flex-row w-full">
      <div className="hidden md:flex md:w-[35%] flex-col p-5 lg:p-12">
        <Image src="/logo.png" width={120} height={100} alt="ticket" priority />
        <h2 className="mt-20 text-secondary">
          Discover tailored events. Sign up for personalized recommendations
          today!
        </h2>
      </div>
      <div className="w-full md:w-[65%] min-h-screen md:min-h-0 bg-white text-neutral-900 md:rounded-l-3xl p-6 sm:p-10 lg:p-20 flex flex-col justify-center">
        <div className="mb-6 md:hidden">
          <Image src="/logo.png" width={100} height={80} alt="ticket" priority />
        </div>
        <h2 className="text-gray-900 dark:text-gray-100">Create Account</h2>
        <LoginForm />
      </div>
    </main>
  );
}
