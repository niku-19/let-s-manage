import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "https://voluntary-management.onrender.com";

// Async action to fetch all volunteers
export const fetchAllVolunteers = createAsyncThunk(
  "volunteers/fetchAll",
  async () => {
    const response = await fetch(`${API_BASE}/volunteer`);
    return await response.json();
  }
);

// Async action to add a volunteer
export const createVolunteer = createAsyncThunk(
  "volunteers/add",
  async (volunteer) => {
    const response = await fetch(`${API_BASE}/volunteer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(volunteer)
    });
    return await response.json();
  }
);

// Async action to update a volunteer
export const updateVolunteer = createAsyncThunk(
  "volunteers/update",
  async ({ volunteerID, data }) => {
    const response = await fetch(`${API_BASE}/volunteer/${volunteerID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await response.json();
  }
);

// Async action to delete a volunteer
export const deleteVolunteer = createAsyncThunk(
  "volunteers/delete",
  async (volunteerId) => {
    const response = await fetch(`${API_BASE}/volunteer/${volunteerId}`, {
      method: "DELETE"
    });
    return await response.json();
  }
);

const volunteersSlice = createSlice({
  name: "volunteers",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchAllVolunteers.fulfilled]: (state, action) => action.payload.data,
    [createVolunteer.fulfilled]: (state, action) => {
      state.push(action.payload.data);
    },
    [updateVolunteer.fulfilled]: (state, action) => {
      const index = state.findIndex((v) => v._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload.data;
      }
    },
    [deleteVolunteer.fulfilled]: (state, action) => {
      return state.filter(
        (volunteer) => volunteer._id !== action.payload.data._id
      );
    }
  }
});

export default volunteersSlice.reducer;
