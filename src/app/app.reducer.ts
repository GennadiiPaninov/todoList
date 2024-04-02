import {createSlice, isPending, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
        setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            isPending(), (state, action) => {
                state.status ='loading' 
            })
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/rejected')

                }, (state, action) => {
                    state.status ='failed'
                })
            .addMatcher(
                (action) => {
                    return action.type.endsWith('/fulfilled')

                }, (state) => {
                    state.status ='succeeded'
                })
    }
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
