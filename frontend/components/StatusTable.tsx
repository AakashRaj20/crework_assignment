import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useAppSelector, useAppDispatch } from "@/redux_store/hooks";
import TaskCard from "./TaskCard";
import {
  userLoading,
  userError,
  loggedInUser,
  getTaskByUser,
  Task,
} from "@/redux_store/slices/getTaskByUserSlice";
import { moveTaskAsync } from "@/redux_store/slices/taskcategorySlice";
import CreateTaskBtn from "./CreateTaskBtn";
import Image from "next/image";

const StatusTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(loggedInUser);
  const isDraggingRef = useRef(false);

  const [localTasks, setLocalTasks] = useState({
    "to-do": [] as Task[],
    "in-progress": [] as Task[],
    "under-review": [] as Task[],
    finished: [] as Task[],
  });

  useEffect(() => {
    dispatch(getTaskByUser());
  }, [dispatch]);

  useEffect(() => {
    if (tasks?.tasks) {
      const newLocalTasks = {
        "to-do": tasks.tasks.filter((task) => task.status === "to-do"),
        "in-progress": tasks.tasks.filter(
          (task) => task.status === "in-progress"
        ),
        "under-review": tasks.tasks.filter(
          (task) => task.status === "under-review"
        ),
        finished: tasks.tasks.filter((task) => task.status === "finished"),
      };
      setLocalTasks(newLocalTasks);
    }
  }, [tasks, dispatch]);

  const onDragStart = () => {
    isDraggingRef.current = true;
  };

  const onDragEnd = (result: DropResult) => {
    isDraggingRef.current = false;
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setLocalTasks((prevTasks) => {
      const newTasks = JSON.parse(
        JSON.stringify(prevTasks)
      ) as typeof prevTasks;
      const sourceColumn =
        newTasks[source.droppableId as keyof typeof newTasks];
      const destColumn =
        newTasks[destination.droppableId as keyof typeof newTasks];
      const [movedTask] = sourceColumn.splice(source.index, 1);

      movedTask.status = destination.droppableId as
        | "to-do"
        | "in-progress"
        | "under-review"
        | "finished";
      destColumn.splice(destination.index, 0, movedTask);

      return newTasks;
    });

    dispatch(
      moveTaskAsync({
        taskId: draggableId,
        newStatus: destination.droppableId as
          | "to-do"
          | "in-progress"
          | "under-review"
          | "finished",
        sourceId: source.droppableId as
          | "to-do"
          | "in-progress"
          | "under-review"
          | "finished",
        destinationId: destination.droppableId as
          | "to-do"
          | "in-progress"
          | "under-review"
          | "finished",
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  const renderColumn = (title: string, status: string) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xl text-[#555555]">{title}</p>
        <Image
          src="/assets/icons/tablestatus.svg"
          width={24}
          height={24}
          alt="icon"
        />
      </div>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {localTasks[status as keyof typeof localTasks].map(
              (task, index) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  index={index}
                  isDragging={isDraggingRef.current}
                />
              )
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <CreateTaskBtn
        btnText="Add new"
        iconSrc="plus.svg"
        width={19}
        height={19}
        className="add-task-btn"
        status={status}
      />
    </div>
  );

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <section className="p-4 grid grid-cols-4 gap-4 bg-white">
        {renderColumn("To do", "to-do")}
        {renderColumn("In progress", "in-progress")}
        {renderColumn("Under review", "under-review")}
        {renderColumn("Finished", "finished")}
      </section>
    </DragDropContext>
  );
};

export default StatusTable;
