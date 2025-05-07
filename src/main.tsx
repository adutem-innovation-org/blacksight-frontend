import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ApiService } from "./apis/api.service.ts";
import { Provider } from "react-redux";
import { changeGapiState, store } from "./store";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { config } from "./config";
import { useStore } from "./hooks/useStore.ts";
import { MantineProvider } from "@mantine/core";

ApiService.setAuthorization(sessionStorage.getItem("blacksight_access_token"));

const Main = () => {
  const { dispatch } = useStore();

  const updateGapiState = () => dispatch(changeGapiState(true));

  return (
    <GoogleOAuthProvider
      clientId={config.google.clientId}
      onScriptLoadSuccess={updateGapiState}
    >
      <BrowserRouter>
        <MantineProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{ duration: 1400 }}
          />
          <App />
        </MantineProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Main />
  </Provider>
);
