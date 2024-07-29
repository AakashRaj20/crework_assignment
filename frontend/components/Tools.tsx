import Image from "next/image";
import { toolOptions } from "@/utils/constants";
import CreateTaskBtn from "./CreateTaskBtn";

const Tools = () => {
  return (
    <div className="flex items-center justify-between">
      {/* Search bar */}
      <div className="flex items-center justify-between bg-white border border-[#E9E9E9] rounded-lg p-2">
        <input type="text" placeholder="Search" />
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="search icon"
        />
      </div>

      {/* tools opton and create task btn */}
      <div className="flex items-center gap-4">
        {toolOptions.map((tool, index) => (
          <button key={index} className="flex items-center text-[#797979] gap-[14px]">
            {tool.name}
            <Image src={tool.icon} width={24} height={24} alt={tool.name} />
          </button>
        ))}

        {/* create task btn */}
        <CreateTaskBtn className="text-base" />
      </div>
    </div>
  );
};

export default Tools;
