import Sidebar from "@/components/Sidebar";
import Features from "@/components/Features";
import Tools from "@/components/Tools";
import Image from "next/image";

const Dashboard = () => {
  return (
    <main className="bg-[#F7F7F7] min-h-screen flex">
      <Sidebar />
      <section className="pl-4 py-6 pr-8 text-black w-full space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-5xl">Good morning, Joe!</h1>
          <div className="flex items-center gap-2">
            <p>Help & feedback</p>
            <Image src="/assets/icons/question.svg" width={24} height={24} alt="help & feedback in icon" />
          </div>
        </div>

        {/* features div */}
        <Features />

        {/* tools section */}
        <Tools />
      </section>
    </main>
  );
};

export default Dashboard;
