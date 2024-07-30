"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux_store/hooks";
import TaskCard from "./TaskCard";
import {
  userLoading,
  userError,
  loggedInUser,
  getTaskByUser,
  Task,
} from "@/redux_store/slices/getTaskByUserSlice";
import { loggedUserDetails } from "@/redux_store/slices/userDetailsSlice";
import CreateTaskBtn from "./CreateTaskBtn";
import Image from "next/image";

const StatusTable = () => {
  const tasks = useAppSelector(loggedInUser);
  const userDetails = useAppSelector(loggedUserDetails);
  const dispatch = useAppDispatch();

  const todoTasks: Task[] = [];
  const inProgressTasks: Task[] = [];
  const underReviewTasks: Task[] = [];
  const finishedTasks: Task[] = [];

  useEffect(() => {
    dispatch(getTaskByUser(userDetails?.data.accessToken));
  }, []);

  //Sort tasks into appropriate arrays
  tasks &&
    tasks?.tasks.forEach((task) => {
      switch (task.status) {
        case "to-do":
          todoTasks.push(task);
          break;
        case "in-progress":
          inProgressTasks.push(task);
          break;
        case "under-review":
          underReviewTasks.push(task);
          break;
        case "finished":
          finishedTasks.push(task);
          break;
        default:
          console.log(`Unknown status: ${task.status}`);
      }
    });

  return (
    <section className="p-4 grid grid-cols-4 gap-4 bg-white">
      {/* todo */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xl text-[#555555]">To do</p>
          <Image
            src="/assets/icons/tablestatus.svg"
            width={24}
            height={24}
            alt="icon"
          />
        </div>
        {tasks &&
          todoTasks.map((task) => <TaskCard key={task._id} task={task} />)}

        {/* add task button */}
        <CreateTaskBtn
          btnText="Add new"
          iconSrc="plus.svg"
          width={19}
          height={19}
          className="add-task-btn"
          status="to-do"
        />
      </div>

      {/* in progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xl text-[#555555]">In progress</p>
          <Image
            src="/assets/icons/tablestatus.svg"
            width={24}
            height={24}
            alt="icon"
          />
        </div>
        {tasks &&
          inProgressTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        <CreateTaskBtn
          btnText="Add new"
          iconSrc="plus.svg"
          width={19}
          height={19}
          className="add-task-btn"
          status="in-progress"
        />
      </div>

      {/* under review */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xl text-[#555555]">Under review</p>
          <Image
            src="/assets/icons/tablestatus.svg"
            width={24}
            height={24}
            alt="icon"
          />
        </div>
        {tasks &&
          underReviewTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        <CreateTaskBtn
          btnText="Add new"
          iconSrc="plus.svg"
          width={19}
          height={19}
          className="add-task-btn"
          status="under-review"
        />
      </div>

      {/* Finished */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xl text-[#555555]">Finished</p>
          <Image
            src="/assets/icons/tablestatus.svg"
            width={24}
            height={24}
            alt="icon"
          />
        </div>
        {tasks &&
          finishedTasks.map((task) => <TaskCard key={task._id} task={task} />)}
        <CreateTaskBtn
          btnText="Add new"
          iconSrc="plus.svg"
          width={19}
          height={19}
          className="add-task-btn"
          status="finished"
        />
      </div>
    </section>
  );
};

export default StatusTable;
