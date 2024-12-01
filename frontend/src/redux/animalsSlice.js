import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchAnimalsApi, fetchAnimalDetailsApi, addAnimalApi} from "../api/animalsApi";

export const fetchAnimals = createAsyncThunk(
    "animals/fetchAnimals",
    async () => {
        const animals = await fetchAnimalsApi();
        return animals;
    }
);

export const fetchAnimalDetails = createAsyncThunk(
    "animals/fetchAnimalDetails",
    async (id) => {
        const animal = await fetchAnimalDetailsApi(id);
        return animal;
    }
);

export const addAnimal = createAsyncThunk(
    "animals/addAnimal",
    async (animal) => {
        const newAnimal = await addAnimalApi(animal);
        return newAnimal;
    }
);

const animalsSlice = createSlice({
    name: "animals",
    initialState: {
        animals: [],
        selectedAnimal: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedAnimal(state) {
            state.selectedAnimal = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimals.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAnimals.fulfilled, (state, action) => {
                state.loading = false;
                state.animals = action.payload;
            })
            .addCase(fetchAnimals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        builder
            .addCase(fetchAnimalDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAnimalDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedAnimal = action.payload;
            })
            .addCase(fetchAnimalDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
        builder
            .addCase(addAnimal.pending, (state) => {
                state.loading = true;
            })
            .addCase(addAnimal.fulfilled, (state, action) => {
                state.loading = false;
                state.animals.push(action.payload);
            })
            .addCase(addAnimal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearSelectedAnimal } = animalsSlice.actions;

export default animalsSlice.reducer;
