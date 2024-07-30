import Image from "next/image";
import { Task } from "@/redux_store/slices/getTaskByUserSlice";
import {
  format,
  parseISO,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import TaskCreationForm from "./TaskCreationForm";
import { useAppDispatch } from "@/redux_store/hooks";
import { getTaskById } from "@/redux_store/slices/getTaskbyIdSlice";
import { useState } from "react";

const TaskCard = ({ task }: { task: Task }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const dispatch = useAppDispatch();

  const toggleForm = () => {
    setIsFormOpen(prev => !prev);
    dispatch(getTaskById(task._id));
  };

  // get time differenece
  const getTimeDifference = (dateString: string) => {
    const date = parseISO(dateString);
    const now = new Date();
    const diffInMinutes = differenceInMinutes(now, date);
    const diffInHours = differenceInHours(now, date);
    const diffInDays = differenceInDays(now, date);

    if (diffInMinutes < 30) {
      return "now";
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} min ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hr ago`;
    } else {
      return `${diffInDays} d ago`;
    }
  };

  // set priority div color
  const priorityColors = {
    low: "bg-[#0ECC5A]",
    medium: "bg-[#FFA235]",
    high: "bg-[#FF6B6B]",
  };

  const color = priorityColors[task?.priority] || "bg-[#FF6B6B]";

  return (
    <div className="task-card-container" onClick={toggleForm}>
      {/* title */}
      <p className="text-[#606060] font-medium mb-1">{task.title}</p>

      {/* description */}
      {task?.description && (
        <p className="text-sm text-[#797979] mb-[13px]">{task.description}</p>
      )}

      {/* priority */}
      {task?.priority && (
        <div
          className={`${color} w-fit px-[6px] py-2 rounded-lg text-xs text-white mb-[13px] capitalize`}
        >
          {task.priority}
        </div>
      )}

      {/* deadline */}
      {task?.deadline && (
        <div className="flex items-center gap-2 mb-4">
          <Image
            src="/assets/icons/clock.svg"
            width={24}
            height={24}
            alt="deadline icon"
          />
          <p className="text-[#606060] text-sm font-semibold">
            {task.deadline && format(parseISO(task.deadline), "yyyy-MM-dd")}
          </p>
        </div>
      )}

      {/* creattion and updaton time */}
      <p className="text-sm text-[#797979] font-medium">
        {task && getTimeDifference(task.updatedAt)}
      </p>

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

export default TaskCard;
