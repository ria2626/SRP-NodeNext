import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}
interface UserState {
  user: UserData | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false,
};

// Async thunk for registering a user
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.success = false;
      state.error = null;
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
  },
});

export const { clearAuthState,logout } = authSlice.actions;

export default authSlice.reducer;
