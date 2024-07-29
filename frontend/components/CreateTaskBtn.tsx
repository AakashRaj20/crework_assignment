"use client";

import { useState } from "react";
import Image from "next/image";
import TaskCreationForm from "./TaskCreationForm";

interface CreateTaskBtnProps {
  className: string;
}

const CreateTaskBtn = ({ className }: CreateTaskBtnProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div>
      <button
        className={`create-task-btn flex items-center ${className}`}
        onClick={toggleForm}
      >
        Create new task
        <Image
          src="/assets/icons/add.svg"
          width={24}
          height={24}
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
        <TaskCreationForm onClose={toggleForm} />
      </div>
    </div>
  );
};

export default CreateTaskBtn;
