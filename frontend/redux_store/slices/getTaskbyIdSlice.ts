import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "./getTaskByUserSlice";
import axios from "axios";
import { RootState } from "../store";

interface TaskDetailState {
  statusCode: number;
  message: string;
  success: boolean;
  data: Task;
  loading: boolean;
  error: string | null | boolean | undefined;
}

const initialState: TaskDetailState = {
  statusCode: 0,
  message: "",
  success: false,
  data: {
    _id: "",
    title: "",
    status: "to-do",
    priority: "low",
    deadline: "",
    description: "",
    owner: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
  loading: false,
  error: null,
};

export const getTaskById = createAsyncThunk(
  "getTaskById",
  async (taskId: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/task/getTaskById?taskId=${taskId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTaskByIdSlice = createSlice({
  name: "getTaskById",
  initialState: initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getTaskById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTaskById.fulfilled, (state, action) => {
      state.loading = false;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.data = action.payload.data;
    });
    builder.addCase(getTaskById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});


export default getTaskByIdSlice.reducer;
export const taskData = (state: RootState) => state.getTaskById;


