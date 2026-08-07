"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { registerUser } from "@/lib/auth/actions";
import { signIn } from "next-auth/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = await registerUser(data);

    if (!result.success) {
      setError(result.error ?? "Something went wrong. Please try again.");
      setIsLoading(false);
      return;
    }

    const loginResult = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (loginResult?.error) {
      setError(
        "Account was created, but we couldn't sign you in. Please log in.",
      );
      setIsLoading(false);
      return;
    }

    window.location.href = "/";
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-10">
        <div className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <Input name="firstName" placeholder="First Name" required />
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <Input name="lastName" placeholder="Last Name" required />
        </div>
      </div>

      <label htmlFor="userName">Username</label>
      <Input
        className="max-w-[380]"
        name="username"
        placeholder="Username"
        required
      />

      <label htmlFor="email">Email Address</label>
      <Input
        className="max-w-[380]"
        name="email"
        type="email"
        placeholder="Email Address"
        required
      />

      <label htmlFor="password">Password</label>
      <div className="relative w-full max-w-[380]">
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
          className="w-full pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {error && <p>{error}</p>}

      <Button className="max-w-[380]" type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </Button>

      <div className="flex gap-2">
        <p>Already have an account?</p>
        <Link href="/login">Login</Link>
      </div>
    </form>
  );
}
