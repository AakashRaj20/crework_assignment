"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux_store/hooks";
import {
  loggedUserDetails,
  getUserDetails,
} from "@/redux_store/slices/userDetailsSlice";
import Sidebar from "@/components/Sidebar";
import Features from "@/components/Features";
import Tools from "@/components/Tools";
import StatusTable from "@/components/StatusTable";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const userDetails = useAppSelector(loggedUserDetails);

  useEffect(() => {
    if (userDetails?.error === true && userDetails?.loading === false) {
      router.push("/login");
    }
  }, []);

  return (
    <main className="bg-[#F7F7F7] min-h-screen flex">
      <Sidebar />
      <section className="pl-4 py-6 pr-8 text-black w-full space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-5xl">
            Good morning, {userDetails?.data.fullname}!
          </h1>
          <div className="flex items-center gap-2">
            <p>Help & feedback</p>
            <Image
              src="/assets/icons/question.svg"
              width={24}
              height={24}
              alt="help & feedback in icon"
            />
          </div>
        </div>

        {/* features div */}
        <Features />

        {/* tools section */}
        <Tools />

        {/* staus table */}
        <StatusTable />
      </section>
    </main>
  );
};

export default Dashboard;
