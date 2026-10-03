import { configureStore, createSlice } from "@reduxjs/toolkit";
const getuserfromlocalstorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const storeduser = window.localStorage.getItem("user");
  return storeduser ? JSON.parse(storeduser) : null;
};
const saveusertolocalstorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const initialState = {
  user: getuserfromlocalstorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(action.payload);
      saveusertolocalstorage(action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
