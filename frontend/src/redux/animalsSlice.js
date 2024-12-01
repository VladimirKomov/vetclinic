import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchAnimalsApi,
    fetchAnimalDetailsApi,
    addAnimalApi,
    addAnimalEventApi,
} from "../api/animalsApi";

// Async action to fetch the list of animals
export const fetchAnimals = createAsyncThunk(
    "animals/fetchAnimals",
    async () => {
        const animals = await fetchAnimalsApi();
        return animals;
    }
);

// Async action to fetch details of a specific animal
export const fetchAnimalDetails = createAsyncThunk(
    "animals/fetchAnimalDetails",
    async (id) => {
        const animal = await fetchAnimalDetailsApi(id);
        return animal;
    }
);

// Async action to add a new animal
export const addAnimal = createAsyncThunk(
    "animals/addAnimal",
    async (animal) => {
        const newAnimal = await addAnimalApi(animal);
        return newAnimal;
    }
);

// Async action to add a new event for a specific animal
export const addAnimalEvent = createAsyncThunk(
    "animals/addAnimalEvent",
    async ({ id, event }) => {
        const newEvent = await addAnimalEventApi(id, event);
        return { id, event: newEvent };
    }
);

// Slice to manage animals state
const animalsSlice = createSlice({
    name: "animals",
    initialState: {
        animals: [], // List of all animals
        selectedAnimal: null, // Currently selected animal details
        loading: false, // Loading state
        error: null, // Error state
    },
    reducers: {
        // Clear selected animal details from the state
        clearSelectedAnimal(state) {
            state.selectedAnimal = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch animals lifecycle handlers
            .addCase(fetchAnimals.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAnimals.fulfilled, (state, action) => {
                state.loading = false;
                state.animals = action.payload; // Update animals list
            })
            .addCase(fetchAnimals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Capture error
            });

        builder
            // Fetch animal details lifecycle handlers
            .addCase(fetchAnimalDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAnimalDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedAnimal = action.payload; // Update selected animal details
            })
            .addCase(fetchAnimalDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Capture error
            });

        builder
            // Add animal lifecycle handlers
            .addCase(addAnimal.pending, (state) => {
                state.loading = true;
            })
            .addCase(addAnimal.fulfilled, (state, action) => {
                state.loading = false;
                state.animals.push(action.payload); // Add new animal to the list
            })
            .addCase(addAnimal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Capture error
            });

        builder
            // Add event lifecycle handlers
            .addCase(addAnimalEvent.pending, (state) => {
                state.loading = true;
            })
            .addCase(addAnimalEvent.fulfilled, (state, action) => {
                state.loading = false;
                // Update events of the selected animal
                if (state.selectedAnimal && state.selectedAnimal.id === action.payload.id) {
                    state.selectedAnimal.events.push(action.payload.event);
                }
            })
            .addCase(addAnimalEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Capture error
            });
    },
});

export const { clearSelectedAnimal } = animalsSlice.actions;

export default animalsSlice.reducer;
