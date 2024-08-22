import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App.tsx";
import "./index.css";
import { persistor, store } from "./redux/store.ts";
import { theme } from "./utils/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
      <App />
      </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
