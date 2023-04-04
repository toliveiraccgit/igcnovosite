import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiLocale from "../../api/locale";

const initialState = {
  status: "idle",
  locale: undefined,
  locales: [],
};

export const get_async_locale = createAsyncThunk(
  "locale/get_locales",
  async (undefined, { rejectWithValue }) => {
    try {
      const response = await ApiLocale.get_locales();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    set_locale: (state, action) => {
      state.locale = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(get_async_locale.pending, (state) => {
        state.status = "loading";
      })
      .addCase(get_async_locale.fulfilled, (state, action) => {
        state.status = "idle";
        state.locales = action.payload;
      })
      .addCase(get_async_locale.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const { set_locale } = userSlice.actions;

export default userSlice.reducer;
