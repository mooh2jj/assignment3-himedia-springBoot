import { createSlice } from "@reduxjs/toolkit";

const initState = {
  email: "",
  accessToken: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      console.log("login: {}", action.payload);
      const payload = action.payload; // {email, pw로 구성}
      return { ...payload }; // 새로운 상태
    },
    logout: (state, action) => {
      console.log("logout");
      // email 삭제
      // accessToken 삭제
      return { ...initState };
    },
    setAccessToken: (state, action) => {
      console.log("setAccessToken: accessToken: ", action.payload);
      state.accessToken = action.payload; // draft만 수정 할 것!
    },
  },
});

export const { login, logout, setAccessToken } = loginSlice.actions;
export default loginSlice.reducer;
