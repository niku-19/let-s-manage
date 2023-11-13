import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "https://voluntary-management.onrender.com";
// Async actions
export const fetchAllEvents = createAsyncThunk("events/fetchAll", async () => {
  const response = await fetch(`${API_BASE}/event`);
  return await response.json();
});

export const createEvent = createAsyncThunk("events/add", async (event) => {
  const response = await fetch(`${API_BASE}/event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event)
  });
  return await response.json();
});

export const updateEvent = createAsyncThunk(
  "events/update",
  async ({ eventID, data }) => {
    console.log(eventID, "eventIDDDDDDD");
    const response = await fetch(`${API_BASE}/event/${eventID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await response.json();
  }
);

export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (eventId) => {
    const response = await fetch(`${API_BASE}/event/${eventId}`, {
      method: "DELETE"
    });
    return await response.json();
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchAllEvents.fulfilled]: (state, action) => action.payload.data,
    [createEvent.fulfilled]: (state, action) => {
      state.push(action.payload.data);
    },
    [updateEvent.fulfilled]: (state, action) => {
      console.log(action, "ACTION");
      const index = state.findIndex((v) => v._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload.data;
      }
    },
    [deleteEvent.fulfilled]: (state, action) => {
      return state.filter((event) => event._id !== action.payload.data._id);
    }
  }
});

export default eventsSlice.reducer;
