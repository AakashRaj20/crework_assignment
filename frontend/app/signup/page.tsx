"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/utils/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Home() {
  const signUpform = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/signup`,
        data
      );
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="main-container">
      <div className="form-container">
        <h5 className="form-welcome-text">
          Welcome to <span className="text-[#4534AC]">Workflo!</span>
        </h5>
        <div>
          <Form {...signUpform}>
            {/* task form */}

            <form onSubmit={signUpform.handleSubmit(onSubmit)}>
              {/* task form fields */}
              <div className="space-y-6">
                {/* fullname */}
                <FormField
                  control={signUpform.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="form-input"
                          placeholder="Fullname"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* email */}
                <FormField
                  control={signUpform.control}
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
                  control={signUpform.control}
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
                  Sign In
                </button>
              </div>
            </form>
          </Form>
        </div>

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
