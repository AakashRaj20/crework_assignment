import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from "./slices/userDetailsSlice";
import getTaskByUserSlice from "./slices/getTaskByUserSlice";
import getTaskByIdSlice from "./slices/getTaskbyIdSlice";
import taskCategorySlice from "./slices/taskcategorySlice";

export const store = configureStore({
  reducer: {
    userDetails: userDetailsSlice,
    getTaskByUser: getTaskByUserSlice,
    getTaskById: getTaskByIdSlice,
    taskCategory: taskCategorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
