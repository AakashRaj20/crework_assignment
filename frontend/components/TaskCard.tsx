import React, { useState, useRef, useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import Image from "next/image";
import { getTaskByUser, Task } from "@/redux_store/slices/getTaskByUserSlice";
import {
  format,
  parseISO,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import UpdateTaskForm from "./UpdateTaskForm";
import { useAppDispatch } from "@/redux_store/hooks";
import { getTaskById } from "@/redux_store/slices/getTaskbyIdSlice";
import axios from "axios";

interface TaskCardProps {
  task: Task;
  index: number;
  isDragging: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, isDragging }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const mouseDownTime = useRef<number | null>(null);
  const dispatch = useAppDispatch();

  const toggleForm = useCallback(() => {
    if (isDragging) return;
    setIsFormOpen((prev) => !prev);
    dispatch(getTaskById(task._id));
  }, [dispatch, task._id, isDragging]);

  // Utility function to get time difference
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

  // Utility object for priority colors
  const priorityColors = {
    low: "bg-[#0ECC5A]",
    medium: "bg-[#FFA235]",
    high: "bg-[#FF6B6B]",
  };

  const color =
    priorityColors[task?.priority as keyof typeof priorityColors] ||
    "bg-[#FF6B6B]";

  // Utility function to remove task
  const removeTask = async (taskId: string) => {
    if (isDragging) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/task/deleteTask?taskId=${taskId}`,
        { withCredentials: true }
      );
      dispatch(getTaskByUser());
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseDown = () => {
    mouseDownTime.current = Date.now();
  };

  const handleMouseUp = (action: () => void) => {
    if (isDragging) return;
    if (mouseDownTime.current && Date.now() - mouseDownTime.current < 200) {
      // If the mouse was down for less than 200ms, consider it a click
      action();
    }
    mouseDownTime.current = null;
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`task-card-container}`}
          onMouseDown={handleMouseDown}
        >
          <div
            {...provided.dragHandleProps}
            className="cursor-move bg-[#F9F9F9] py-[14px] px-[14px] rounded-t-lg border-x border-t border-[#DEDEDE]"
          >
            {/* title */}
            <p className="text-[#606060] font-medium mb-1">{task.title}</p>

            {/* description */}
            {task?.description && (
              <p className="text-sm text-[#797979] mb-[13px]">
                {task.description}
              </p>
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
                  {format(parseISO(task.deadline), "yyyy-MM-dd")}
                </p>
              </div>
            )}
          </div>

          {/* creation and updation time */}
          <div className="flex items-center justify-between bg-[#F9F9F9] pb-[14px] px-[14px] rounded-b-lg border-x border-b border-[#DEDEDE]">
            <p className="text-sm text-[#797979] font-medium">
              {getTimeDifference(task.updatedAt)}
            </p>
            <div className="space-x-5">
              <button
                onMouseUp={() => handleMouseUp(toggleForm)}
                onTouchEnd={() => handleMouseUp(toggleForm)}
              >
                <Image
                  src="/assets/icons/description.svg"
                  height={24}
                  width={24}
                  alt="edit icon"
                />
              </button>
              <button
                onMouseUp={() => handleMouseUp(() => removeTask(task._id))}
                onTouchEnd={() => handleMouseUp(() => removeTask(task._id))}
              >
                <Image
                  src="/assets/icons/delete.svg"
                  height={24}
                  width={24}
                  alt="delete icon"
                />
              </button>
            </div>
          </div>

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
            } ${isDragging ? "hidden" : ""}`}
          >
            <UpdateTaskForm onClose={toggleForm} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
