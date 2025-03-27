import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../redux/postSlice";
import Home from "../pages/Home";

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
  preloadedState: {
    posts: {
      posts: [
        { id: 1, title: "eum et est occaecati" },
        { id: 2, title: "qui est esse" }
      ],
      status: "succeeded",
      error: null
    }
  }
});

describe("Home Component", () => {
  test("renders the search input and posts", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByPlaceholderText("Search posts...")).toBeInTheDocument();
    expect(await screen.findByText("eum et est occaecati")).toBeInTheDocument();
    expect(await screen.findByText("qui est esse")).toBeInTheDocument();
  });

  test("filters posts based on search input", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search posts...");
    fireEvent.change(searchInput, { target: { value: "eum et est occaecati" } });

    expect(await screen.findByText("eum et est occaecati")).toBeInTheDocument();
    expect(screen.queryByText("qui est esse")).not.toBeInTheDocument();
  });

  test("renders correctly with no posts", async () => {
    const emptyStore = configureStore({
      reducer: {
        posts: postReducer,
      },
      preloadedState: {
        posts: {
          posts: [],
          status: "succeeded",
          error: null
        }
      }
    });

    render(
      <Provider store={emptyStore}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText("eum et est occaecati")).not.toBeInTheDocument();
    expect(screen.queryByText("qui est esse")).not.toBeInTheDocument();
  });

  test("renders loading state", () => {
    const loadingStore = configureStore({
      reducer: {
        posts: postReducer,
      },
      preloadedState: {
        posts: {
          posts: [],
          status: "loading",
          error: null
        }
      }
    });

    render(
      <Provider store={loadingStore}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    const errorStore = configureStore({
      reducer: {
        posts: postReducer,
      },
      preloadedState: {
        posts: {
          posts: [],
          status: "failed",
          error: "Failed to fetch posts"
        }
      }
    });

    render(
      <Provider store={errorStore}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Error loading posts.")).toBeInTheDocument();
  });
});