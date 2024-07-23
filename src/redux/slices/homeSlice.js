import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        diaryItems: [],
        paperItems: [],
        nickname: "",
    },
    reducers: {
        setDiaryItems: (state, action) => {
            state.diaryItems = action.payload;
        },
        setPaperItems: (state, action) => {
            state.paperItems = action.payload;
        },
        setNickname: (state, action) => {
            state.nickname = action.payload;
        },
    },
});

export const { setDiaryItems, setPaperItems, setNickname } = homeSlice.actions;
export default homeSlice;
