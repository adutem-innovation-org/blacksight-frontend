import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ApiService } from "./apis/api.service.ts";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";

ApiService.setAuthorization(sessionStorage.getItem("blacksight_access_token"));

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 1400 }}
      />
      <App />
    </BrowserRouter>
  </Provider>
);
