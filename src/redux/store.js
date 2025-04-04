import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
  // preloadedState: {
  //   posts: {
  //     posts: [
  //       { id: 1, title: "eum et est occaecati" },
  //       { id: 2, title: "qui est esse" }
  //     ],
  //     status: "succeeded",
  //     error: null
  //   }
  // }
});
