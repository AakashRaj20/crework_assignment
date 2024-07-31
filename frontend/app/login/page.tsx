"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { logInSchema } from "@/utils/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const Login = () => {
  const router = useRouter();

  const logInform = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof logInSchema>) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
        data,
        {
          withCredentials: true,
        }
      );
      router.push("/");
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className="main-container">
      <div className="form-container">
        <h5 className="form-welcome-text">
          Welcome to <span className="text-[#4534AC]">Workflo!</span>
        </h5>
        <Form {...logInform}>
          {/* task form */}

          <form onSubmit={logInform.handleSubmit(onSubmit)}>
            {/* task form fields */}
            <div className="space-y-6">
              {/* email */}
              <FormField
                control={logInform.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        className="form-input"
                        placeholder="Your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* passsword */}
              <FormField
                control={logInform.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        className="form-input"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <button className="sign-up-btn" type="submit">
                Log In
              </button>
            </div>
          </form>
        </Form>

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
