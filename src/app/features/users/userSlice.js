import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {
        email: "",
        name: "",
        role: ""
    },
    isLoading: false,
    isError: false,
    error: ""
};
export const getUser = createAsyncThunk(
    "users/getUser",
    async (data) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DEV}/user/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                authorization: localStorage.getItem("tech_token"),
            }
        });
        const results = await res.json();
        return results;
    }
);
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLogoutSet: (state) => {
            state.user = { email: "", role: "" };
        },
        autoUserSet: (state, {payload}) => {
            state.user = payload;
        },
    },
    extraReducers: (builder) => {
        // case setup for get user by email
        builder.addCase(getUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = "";
        });
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.success) {
                state.user = action.payload.data;
                state.isError = false;
                state.error = "";
            }
            else {
                state.user = { email: "", role: "" };
                state.isError = true;
                state.error = action.payload.message;
            }

        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = { email: "", role: "" };
            state.isError = true;
            state.error = action.error.message;
        });
    }
})

export const { userLogoutSet, autoUserSet } = userSlice.actions;
export default userSlice.reducer;