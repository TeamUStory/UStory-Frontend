import { createSlice } from "@reduxjs/toolkit";

const diarySlice = createSlice({
    name: "diary",
    initialState: {
        // 다이어리 상세 페이지 초기 상태
        diaryDetail: {
            users: [],
            imgUrl: "",
            name: "",
            diaryCategory: "",
            color: "",
        },
        paperList: [],
        isIndividual: false,
        isToggle: false,

        // 다이어리 등록 페이지 초기 상태
        diaryId: 0,
        isModalOpen: false,
        isBackModalOpen: false,
        buttonActive: "disabled",
        selectedColor: "",
        members: [],

        // 다이어리 기본 이미지
        imageUrl: "https://ustory-bucket.s3.ap-northeast-2.amazonaws.com/common/diary-profile.png",

        // 다이어리 목록 초기 상태
        activeTab: null,
        diaryItems: [],
        page: 1,
        loading: false,

        // 다이어리 페이퍼 리스트 초기 상태
        paperItems: [],
        postItems: [],
    },
    reducers: {
        // 다이어리 상세 페이지 함수
        setDiaryDetail: (state, action) => {
            state.diaryDetail = action.payload;
            state.isIndividual = action.payload.diaryCategory === "개인";
        },
        setIsIndividual: (state, action) => {
            state.isIndividual = action.payload;
        },
        setPaperList: (state, action) => {
            state.paperList = action.payload;
        },
        setIsToggle: (state, action) => {
            state.isToggle = action.payload;
        },
        resetIsToggle: (state) => {
            state.isToggle = false;
        },

        // 다이어리 등록 페이지 함수
        setDiaryId: (state, action) => {
            state.diaryId = action.payload;
        },
        toggleModal: (state) => {
            state.isModalOpen = !state.isModalOpen;
        },
        toggleBackModal: (state) => {
            state.isBackModalOpen = !state.isBackModalOpen;
        },
        setButtonActive: (state, action) => {
            state.buttonActive = action.payload;
        },
        setSelectedColor: (state, action) => {
            state.selectedColor = action.payload;
        },
        setMembers: (state, action) => {
            state.members = action.payload;
        },
        setImageUrl: (state, action) => {
            state.imageUrl = action.payload;
        },

        // 다이어리 목록 함수
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        setDiaryItems: (state, action) => {
            state.diaryItems = action.payload;
        },
        addDiaryItems: (state, action) => {
            state.diaryItems = [...state.diaryItems, ...action.payload];
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        // 다이어리 페이퍼 리스트 함수
        setPaperItems: (state, action) => {
            state.paperItems = action.payload;
        },
        addPaperItems: (state, action) => {
            state.paperItems = [...state.paperItems, ...action.payload];
        },
        setPostItems: (state, action) => {
            state.postItems = action.payload;
        },
    },
});

export const {
    setDiaryDetail,
    setIsIndividual,
    setPaperList,
    setIsToggle,
    resetIsToggle,
    setDiaryId,
    toggleModal,
    toggleBackModal,
    setButtonActive,
    setSelectedColor,
    setMembers,
    setImageUrl,
    setLoading,
    setActiveTab,
    setDiaryItems,
    setPage,
    addDiaryItems,
    setPaperItems,
    addPaperItems,
    setPostItems,
} = diarySlice.actions;

export default diarySlice;
