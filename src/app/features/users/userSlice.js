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
    async (userId) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DEV}/user/userid/${userId}`, {
            headers: {
                'content-type': 'application/json',
                authorization: `${localStorage.getItem('token')}`,
            }
        });
        const results = await res.json();
        // console.log(results)
        if (results?.success) {
            return results;
        } else {
            return results;
        }
    }
);
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLogoutSet: (state) => {
            state.user = { email: "", role: "" };
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
            }
            else {
                state.user = { email: "", role: "" };
            }
            state.isError = false;
            state.error = "";
        });
        builder.addCase(getUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = { email: "", role: "" };
            state.isError = true;
            state.error = action.error.message;
        });
    }
})

export const { userLogoutSet } = userSlice.actions;
export default userSlice.reducer;