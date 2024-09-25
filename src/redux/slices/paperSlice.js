import { createSlice } from "@reduxjs/toolkit";

const paperSlice = createSlice({
    name: "paper",
    initialState: {
        // 페이퍼 페이지 초기 상태
        commentList: [],
        isToggle: false,
        toggleIndex: null,
        isSaveIconFilled: false,
        isModalOpen: false,
        isCommentOpen: false,
        pageDetail: {},
        images: [],
        comment: "",
        editCommentId: null,
        editCommentContent: "",
        likeNum: 0,

        // 페이퍼 등록 초기 상태
        diary: {},
        isBackModalOpen: false,
        buttonActive: "disabled",
        placeInformation: {},
        paperId: 0,

        // 이미지 리스트 및 썸네일
        imageUrls: [],
        thumbnailImageUrl: "",

        // 페이퍼 수정 초기 상태
        isLoadedFromStorage: false,
        thumbnailUrl: "",
    },
    reducers: {
        // 페이퍼 페이지 함수
        setComment: (state, action) => {
            state.comment = action.payload;
        },
        setEditCommentId: (state, action) => {
            state.editCommentId = action.payload;
        },
        setEditCommentContent: (state, action) => {
            state.editCommentContent = action.payload;
        },
        toggleMenu: (state) => {
            state.isToggle = !state.isToggle;
        },
        resetToggleMenu: (state) => {
            state.isToggle = false;
        },
        setToggleIndex: (state, action) => {
            state.toggleIndex = action.payload;
        },
        resetToggleIndex: (state) => {
            state.toggleIndex = null;
        },
        setCommentList: (state, action) => {
            state.commentList = action.payload;
        },
        setImages: (state, action) => {
            state.images = action.payload;
        },
        setIsSaveIconFilled: (state, action) => {
            state.isSaveIconFilled = action.payload;
        },
        setIsHeartIconFilled: (state, action) => {
            state.isHeartIconFilled = action.payload;
        },
        setIsModalOpen: (state, action) => {
            state.isModalOpen = action.payload;
        },
        setIsCommentOpen: (state, action) => {
            state.isCommentOpen = action.payload;
        },
        setPageDetail: (state, action) => {
            state.pageDetail = action.payload;
        },
        setLikeNum: (state, action) => {
            state.likeNum = action.payload;
        },

        // 페이퍼 등록 페이지 함수
        setDiary: (state, action) => {
            state.diary = action.payload;
        },
        setPlaceInformation: (state, action) => {
            state.placeInformation = action.payload;
        },
        setPaperId: (state, action) => {
            state.paperId = action.payload;
        },
        setButtonActive: (state, action) => {
            state.buttonActive = action.payload;
        },
        setIsBackModalOpen: (state, action) => {
            state.isBackModalOpen = action.payload;
        },

        // 이미지 업로드 함수
        setImageUrls: (state, action) => {
            state.imageUrls = action.payload;
        },
        setThumbnailImageUrl: (state, action) => {
            state.thumbnailImageUrl = action.payload;
        },

        // 페이퍼 수정 페이지 함수
        setIsLoadedFromStorage: (state, action) => {
            state.isLoadedFromStorage = action.payload;
        },
        setThumbnailUrl: (state, action) => {
            state.thumbnailUrl = action.payload;
        },
    },
});

export const {
    setComment,
    setEditCommentId,
    setEditCommentContent,
    toggleMenu,
    resetToggleMenu,
    setCommentList,
    setImages,
    setIsSaveIconFilled,
    setIsHeartIconFilled,
    setIsModalOpen,
    setIsCommentOpen,
    setPageDetail,
    setLikeNum,
    setToggleIndex,
    resetToggleIndex,
    setDiary,
    setPlaceInformation,
    setPaperId,
    setButtonActive,
    setIsBackModalOpen,
    setImageUrls,
    setThumbnailImageUrl,
    setIsLoadedFromStorage,
    setThumbnailUrl,
} = paperSlice.actions;

export default paperSlice;
