import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "@/redux/slices/homeSlice";
import diarySlice from "@/redux/slices/diarySlice";
import paperSlice from "@/redux/slices/paperSlice";
import userSlice from "@/redux/slices/userSlice";

const store = configureStore({
    reducer: {
        home: homeSlice.reducer,
        diary: diarySlice.reducer,
        paper: paperSlice.reducer,
        user: userSlice.reducer
    }
})

export default store;