import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
export const getTaskByUser = createAsyncThunk(
  "getTaskByUser",
  async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/task/getTaskByUser`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export interface Task {
  _id: string;
  title: string;
  status: "to-do" | "in-progress" | "under-review" | "finished";
  priority: "low" | "medium" | "high";
  deadline: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  statusCode: number;
  data: Task[];
  message: string;
  success: boolean;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null | boolean;
}
const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const getTaskByIdSlice = createSlice({
  name: "getTaskByUser",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTaskByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTaskByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload.data;
    });
    builder.addCase(getTaskByUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default getTaskByIdSlice.reducer;
export const loggedInUser = (state: RootState) => state.getTaskByUser;
export const userLoading = (state: RootState) => state.getTaskByUser.loading;
export const userError = (state: RootState) => state.getTaskByUser.error;
