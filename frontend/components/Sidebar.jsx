"use client";

import Image from "next/image";
import { utilsIcons, navlinks } from "@/utils/constants";
import { useState } from "react";
import { usePathname } from "next/navigation";
import CreateTaskBtn from "./CreateTaskBtn";

const Sidebar = () => {
  const [activeBtn, setActiveBtn] = useState("home");

  const pathname = usePathname();

  const handleActiveBtn = (btnName) => {
    setActiveBtn(btnName);
  };

  return (
    <nav className="side-nav">
      <div className="space-y-2">
        {/* user name & picture */}
        <div className="flex gap-2 items-center">
          <Image
            src="/assets/images/profile_pic.png"
            height={31}
            width={31}
            alt="user_profile"
          />
          <p className="font-medium text-xl">Joe Gardner</p>
        </div>

        {/* notifiaction, theme, logout button  */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            {utilsIcons.map((icon, index) => (
              <button>
                <Image
                  key={index}
                  src={icon.icon}
                  width={24}
                  height={24}
                  alt={icon.name}
                />
              </button>
            ))}
          </div>
          <button className="text-[#797979] rounded p-2 bg-[#F4F4F4]">
            Logout
          </button>
        </div>
      </div>

      {/* navigation options */}
      <div>
        {navlinks.map((link, index) => (
          <button
            key={index}
            className={`flex p-2 rounded gap-[14px] w-full ${
              activeBtn === link.name.toLowerCase() &&
              "bg-[#F4F4F4] border border-[#DDDDDD]"
            }`}
          >
            <Image src={link.icon} width={24} height={24} alt={link.name} />
            <p>{link.name}</p>
          </button>
        ))}
      </div>

      {/* create task btn */}
      <CreateTaskBtn className="w-full text-xl" />

      {/* download app */}
      <button className="download-btn">
        <Image
          src="/assets/icons/download.svg"
          width={40}
          height={40}
          alt="Download icon"
        />
        <div className="text-[#666666]">
          <p className="font-medium text-xl">Download the app</p>
          <p className="text-sm">Get the full experience </p>
        </div>
      </button>
    </nav>
  );
};

export default Sidebar;
