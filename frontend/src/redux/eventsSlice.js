import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addAnimalEventApi } from "../api/animalsApi";

export const addAnimalEvent = createAsyncThunk(
    "events/addAnimalEvent",
    async ({ id, event }) => {
        const newEvent = await addAnimalEventApi(id, event);
        return { id, event: newEvent };
    }
);

const eventsSlice = createSlice({
    name: "events",
    initialState: {
        events: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearEvents(state) {
            state.events = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addAnimalEvent.pending, (state) => {
                state.loading = true;
            })
            .addCase(addAnimalEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.events.push(action.payload.event);
            })
            .addCase(addAnimalEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
