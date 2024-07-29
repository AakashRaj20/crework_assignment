"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormData, logInSchema } from "@/utils/types";
import FormField from "@/components/FormFields";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        data
      );
      console.log(response.data);
      router.push("/");
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(logInSchema),
  });

  return (
    <main className="main-container">
      <div className="form-container">
        <h5 className="form-welcome-text">
          Welcome to <span className="text-[#4534AC]">Workflo!</span>
        </h5>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            Login
          </button>
        </form>

        <h6 className="text-xl text-[#606060] text-center">
          Don’t have an account? Create a{" "}
          <Link href={"/signup"} className="text-[#0054A1]">
            new account.
          </Link>
        </h6>
      </div>
    </main>
  );
};

export default Login;
