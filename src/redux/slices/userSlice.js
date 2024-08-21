import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: "",
  name: "",
  nickname: "",
  profileImgUrl: "",
  profileDescription: ""
}

const userSlice = createSlice({
  name : "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.profileImgUrl = action.payload.profileImgUrl;
      state.profileDescription = action.payload.profileDescription;
    }
  }
})

export const { setUser } = userSlice.actions;

export default userSlice;