import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// Async Thunks
export const createShortUrl = createAsyncThunk(
  "url/createShortUrl",
  async (originalUrl, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: originalUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || "Failed to create URL");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllUrls = createAsyncThunk(
  "url/getAllUrls",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}`);
      if (!response.ok) {
        throw new Error("Failed to fetch URLs");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUrl = createAsyncThunk(
  "url/updateUrl",
  async ({ shortCode, url }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/shorten/${shortCode}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error || "Failed to update URL");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUrl = createAsyncThunk(
  "url/deleteUrl",
  async (shortCode, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/shorten/${shortCode}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete URL");
      }

      return { shortCode };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUrlStats = createAsyncThunk(
  "url/getUrlStats",
  async (shortCode, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/shorten/${shortCode}/stats`);
      if (!response.ok) {
        throw new Error("Failed to get URL stats");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const urlSlice = createSlice({
  name: "url",
  initialState: {
    urls: [],
    loading: false,
    error: null,
    stats: null,
    statsLoading: false,
    statsError: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearStats: (state) => {
      state.stats = null;
      state.statsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create URL
      .addCase(createShortUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShortUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.urls.unshift(action.payload);
      })
      .addCase(createShortUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get All URLs
      .addCase(getAllUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload;
      })
      .addCase(getAllUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update URL
      .addCase(updateUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = state.urls.map((url) =>
          url.shortCode === action.payload.shortCode ? action.payload : url
        );
      })
      .addCase(updateUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete URL
      .addCase(deleteUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = state.urls.filter(
          (url) => url.shortCode !== action.payload.shortCode
        );
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get URL Stats
      .addCase(getUrlStats.pending, (state) => {
        state.statsLoading = true;
        state.statsError = null;
      })
      .addCase(getUrlStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(getUrlStats.rejected, (state, action) => {
        state.statsLoading = false;
        state.statsError = action.payload;
      });
  },
});

export const { clearError, clearStats } = urlSlice.actions;
export default urlSlice.reducer;
