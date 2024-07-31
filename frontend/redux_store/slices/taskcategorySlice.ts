import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "./getTaskByUserSlice";
import { RootState } from "../store";
import axios from "axios";

interface TaskCategoryState {
  todoTasks: Task[];
  inProgressTasks: Task[];
  underReviewTasks: Task[];
  finishedTasks: Task[];
}

const initialState: TaskCategoryState = {
  todoTasks: [],
  inProgressTasks: [],
  underReviewTasks: [],
  finishedTasks: [],
};

type TaskStatus = "to-do" | "in-progress" | "under-review" | "finished";

export const moveTaskAsync = createAsyncThunk(
  "taskCategory/moveTaskAsync",
  async (
    {
      taskId,
      newStatus,
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex,
    }: {
      taskId: string;
      newStatus: TaskStatus;
      sourceId: TaskStatus;
      destinationId: TaskStatus;
      sourceIndex: number;
      destinationIndex: number;
    },
    { rejectWithValue }
  ) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/task/updateTask?taskId=${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      return {
        sourceId,
        destinationId,
        sourceIndex,
        destinationIndex,
        newStatus,
      };
    } catch (error) {
      return rejectWithValue("Failed to update task status");
    }
  }
);

export const taskcategorySlice = createSlice({
  name: "taskCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(moveTaskAsync.fulfilled, (state, action) => {
      const {
        sourceId,
        destinationId,
        sourceIndex,
        destinationIndex,
        newStatus,
      } = action.payload;

      const getList = (id: TaskStatus): Task[] => {
        switch (id) {
          case "to-do":
            return state.todoTasks;
          case "in-progress":
            return state.inProgressTasks;
          case "under-review":
            return state.underReviewTasks;
          case "finished":
            return state.finishedTasks;
        }
      };

      const sourceList = getList(sourceId);
      const destList = getList(destinationId);

      const [removed] = sourceList.splice(sourceIndex, 1);
      destList.splice(destinationIndex, 0, { ...removed, status: newStatus });
    });
  },
});


export const todoTasks = (state: RootState) => state.taskCategory.todoTasks;
export const inProgressTasks = (state: RootState) =>
  state.taskCategory.inProgressTasks;
export const underReviewTasks = (state: RootState) =>
  state.taskCategory.underReviewTasks;
export const finishedTasks = (state: RootState) =>
  state.taskCategory.finishedTasks;

export default taskcategorySlice.reducer;
