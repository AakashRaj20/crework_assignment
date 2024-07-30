import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

interface UserDetailState {
  statusCode: number;
  message: string;
  success: boolean;
  data: {
    _id: string;
    fullname: string;
    email: string;
  };
  loading: boolean;
  error: string | null | boolean | undefined;
}

const initialState: UserDetailState = {
  statusCode: 0,
  message: "",
  success: false,
  data: {
    _id: "",
    fullname: "",
    email: "",
  },
  loading: false,
  error: null,
};

export const getUserDetails = createAsyncThunk("getUserDetails", async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/v1/auth/profile", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
      state.success = action.payload.success;
      state.data = action.payload.data;
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userDetailsSlice.reducer;
export const loggedUserDetails = (state: RootState) => state.userDetails;
