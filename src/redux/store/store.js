import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "@/redux/slices/homeSlice";
import diarySlice from "@/redux/slices/diarySlice";

const store = configureStore({
    reducer: {
        home: homeSlice.reducer,
        diary: diarySlice.reducer
    }
})

export default store;