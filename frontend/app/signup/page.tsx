"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormData, signInSchema } from "@/utils/types";
import FormField from "@/components/FormFields";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const onSubmit = async (data: FormData) => {
    console.log("SUCCESS", data);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        data
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });

  return (
    <main className="main-container">
      <div className="form-container">
        <h5 className="form-welcome-text">
          Welcome to <span className="text-[#4534AC]">Workflo!</span>
        </h5>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="fullname"
            type="text"
            placeholder="Full Name"
            register={register}
            error={errors.fullname}
          />
          <FormField
            name="email"
            type="email"
            placeholder="Your Email"
            register={register}
            error={errors.email}
          />
          <FormField
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors.password}
          />

          <button type="submit" className="sign-up-btn">
            Sign Up
          </button>
        </form>

        <h6 className="text-xl text-[#606060] text-center">
          Already have an account?{" "}
          <Link href={"/login"} className="text-[#0054A1]">
            Log in.
          </Link>
        </h6>
      </div>
    </main>
  );
}
