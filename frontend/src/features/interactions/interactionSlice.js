import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/api";

export const fetchInteractions = createAsyncThunk(
    "interactions/fetchInteractions",
    async () => {
        const res = await API.get("/interactions/");
        return res.data;
    }
);

export const createInteraction = createAsyncThunk(
    "interactions/createInteraction",
    async (data) => {
        const res = await API.post("/interactions/", data);
        return res.data;
    }
);

export const chatLogInteraction = createAsyncThunk(
    "interactions/chatLogInteraction",
    async (message) => {
        const res = await API.post("/ai/chat-log", { message });
        return res.data;
    }
);

const interactionSlice = createSlice({
    name: "interactions",
    initialState: {
        items: [],
        loading: false,
        aiResult: null,
        aiFormData: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInteractions.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(createInteraction.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(chatLogInteraction.pending, (state) => {
                state.loading = true;
            })
            .addCase(chatLogInteraction.fulfilled, (state, action) => {
                state.loading = false;
                state.aiResult = action.payload;
                state.aiFormData = action.payload.interaction;
                state.items.unshift(action.payload.interaction);
            });
    },
});

export default interactionSlice.reducer;