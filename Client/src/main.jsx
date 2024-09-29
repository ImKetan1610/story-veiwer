import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import Layout from "./Components/Layout.jsx";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary>
        <Layout>
          <App />
        </Layout>
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
);
