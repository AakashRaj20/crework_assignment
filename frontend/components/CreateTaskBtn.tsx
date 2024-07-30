"use client";

import { useState } from "react";
import Image from "next/image";
import TaskCreationForm from "./TaskCreationForm";

interface CreateTaskBtnProps {
  className: string;
  btnText: string;
  iconSrc: string;
  width: number;
  height: number;
  status?: string;
}

const CreateTaskBtn = ({ className, btnText, iconSrc, width, height, status }: CreateTaskBtnProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div>
      <button
        className={className}
        onClick={toggleForm}
      >
       {btnText}
        <Image
          src={`/assets/icons/${iconSrc}`}
          width={width}
          height={height}
          alt="add task icon"
          className="ml-2"
        />
      </button>

      {/* Overlay */}
      <div
        className={`form-overlay ${
          isFormOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleForm}
      ></div>

      {/* Side Form */}
      <div
        className={`sidebar-form-animation ${
          isFormOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <TaskCreationForm taskStatus={status} onClose={toggleForm} />
      </div>
    </div>
  );
};

export default CreateTaskBtn;
