import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "@/redux/slices/homeSlice";
import diarySlice from "@/redux/slices/diarySlice";
import paperSlice from "@/slices/paperSlice";

const store = configureStore({
    reducer: {
        home: homeSlice.reducer,
        diary: diarySlice.reducer,
        paper: paperSlice.reducer
    }
})

export default store;